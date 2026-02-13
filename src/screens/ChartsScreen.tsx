import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useApp } from '../context/AppContext';
import { generateGrowthCurveData } from '../utils/calculations';
import Svg, { Circle } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

type ChartType = 'length' | 'weight' | 'headCirc';
type Gender = 'male' | 'female';

export function ChartsScreen() {
  const { t, lastMeasurement } = useApp();
  const [chartType, setChartType] = useState<ChartType>('length');
  const [gender, setGender] = useState<Gender>(lastMeasurement?.gender || 'male');

  const fullChartData = generateGrowthCurveData(gender, chartType);
  
  // Use full 0-24 months range
  const chartData = fullChartData;
  
  // Select representative points for display (every 3 months to avoid overcrowding)
  const filteredData = useMemo(() => {
    return chartData.filter((_, index) => index % 3 === 0 || index === chartData.length - 1);
  }, [chartData]);
  
  const labels = filteredData.map(d => `${d.age}m`);
  
  // Get child's measurement point if available, matching gender, and within age range
  const childPoint = useMemo(() => {
    if (!lastMeasurement || lastMeasurement.gender !== gender) return null;
    if (lastMeasurement.ageInMonths < 0 || lastMeasurement.ageInMonths > 24) return null;
    
    let value = 0;
    switch (chartType) {
      case 'length':
        value = lastMeasurement.lengthCm;
        break;
      case 'weight':
        value = lastMeasurement.weightKg;
        break;
      case 'headCirc':
        value = lastMeasurement.headCircCm || 0;
        break;
    }
    
    if (value <= 0) return null;
    return { age: lastMeasurement.ageInMonths, value };
  }, [lastMeasurement, gender, chartType]);
  
  const datasets = [
    {
      data: filteredData.map(d => d.sd2neg),
      color: () => 'rgba(255, 100, 100, 0.4)',
      strokeWidth: 1,
    },
    {
      data: filteredData.map(d => d.sd1neg),
      color: () => 'rgba(255, 180, 100, 0.6)',
      strokeWidth: 1,
    },
    {
      data: filteredData.map(d => d.median),
      color: () => 'rgba(74, 144, 217, 1)',
      strokeWidth: 3,
    },
    {
      data: filteredData.map(d => d.sd1),
      color: () => 'rgba(255, 180, 100, 0.6)',
      strokeWidth: 1,
    },
    {
      data: filteredData.map(d => d.sd2),
      color: () => 'rgba(255, 100, 100, 0.4)',
      strokeWidth: 1,
    },
  ];

  const getChartTitle = () => {
    switch (chartType) {
      case 'length':
        return t('heightForAge');
      case 'weight':
        return t('weightForAge');
      case 'headCirc':
        return t('headCircForAge');
    }
  };

  const getYAxisUnit = () => {
    switch (chartType) {
      case 'length':
      case 'headCirc':
        return t('cm');
      case 'weight':
        return t('kg');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('growthCharts')}</Text>
        </View>

        {/* Gender selector */}
        <View style={styles.selectorContainer}>
          <View style={styles.selector}>
            <TouchableOpacity
              style={[styles.selectorButton, gender === 'male' && styles.selectorButtonActive]}
              onPress={() => setGender('male')}
            >
              <Text style={[styles.selectorIcon]}>👦</Text>
              <Text style={[styles.selectorText, gender === 'male' && styles.selectorTextActive]}>
                {t('male')}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.selectorButton, gender === 'female' && styles.selectorButtonActive]}
              onPress={() => setGender('female')}
            >
              <Text style={[styles.selectorIcon]}>👧</Text>
              <Text style={[styles.selectorText, gender === 'female' && styles.selectorTextActive]}>
                {t('female')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Chart type selector */}
        <View style={styles.chartTypeContainer}>
          <TouchableOpacity
            style={[styles.chartTypeButton, chartType === 'length' && styles.chartTypeButtonActive]}
            onPress={() => setChartType('length')}
          >
            <Text style={[styles.chartTypeText, chartType === 'length' && styles.chartTypeTextActive]}>
              📏 {t('height')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.chartTypeButton, chartType === 'weight' && styles.chartTypeButtonActive]}
            onPress={() => setChartType('weight')}
          >
            <Text style={[styles.chartTypeText, chartType === 'weight' && styles.chartTypeTextActive]}>
              ⚖️ {t('weight')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.chartTypeButton, chartType === 'headCirc' && styles.chartTypeButtonActive]}
            onPress={() => setChartType('headCirc')}
          >
            <Text style={[styles.chartTypeText, chartType === 'headCirc' && styles.chartTypeTextActive]}>
              🧠 {t('headCirc')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>{getChartTitle()}</Text>
          <Text style={styles.chartSubtitle}>({getYAxisUnit()})</Text>
          
          {/* Show child's measurement info */}
          {childPoint && (
            <View style={styles.childPointInfo}>
              <Text style={styles.childPointText}>
                🔴 {t('childMeasurement')}: {childPoint.value.toFixed(1)} {getYAxisUnit()} @ {childPoint.age.toFixed(1)} {t('months')}
              </Text>
            </View>
          )}
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <LineChart
              data={{
                labels: labels,
                datasets: datasets,
                legend: [],
              }}
              width={Math.max(screenWidth - 64, filteredData.length * 35)}
              height={300}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(74, 144, 217, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '0',
                },
                propsForLabels: {
                  fontSize: 9,
                },
              }}
              bezier
              style={styles.chart}
              withDots={false}
              withInnerLines={true}
              withOuterLines={true}
              withVerticalLines={true}
              withHorizontalLines={true}
              segments={5}
              decorator={() => {
                if (!childPoint) return null;
                
                // Calculate position on chart
                const chartWidth = Math.max(screenWidth - 64, filteredData.length * 35);
                const chartHeight = 300;
                const paddingLeft = 64;
                const paddingRight = 16;
                const paddingTop = 16;
                const paddingBottom = 40;
                
                const minAge = filteredData[0]?.age || 0;
                const maxAge = filteredData[filteredData.length - 1]?.age || 24;
                const allValues = [
                  ...filteredData.map(d => d.sd2neg),
                  ...filteredData.map(d => d.sd2),
                ];
                const minValue = Math.min(...allValues);
                const maxValue = Math.max(...allValues);
                
                const xRatio = (childPoint.age - minAge) / (maxAge - minAge);
                const x = paddingLeft + xRatio * (chartWidth - paddingLeft - paddingRight);
                
                const yRatio = (childPoint.value - minValue) / (maxValue - minValue);
                const y = chartHeight - paddingBottom - yRatio * (chartHeight - paddingTop - paddingBottom);
                
                return (
                  <Svg>
                    <Circle
                      cx={x}
                      cy={y}
                      r={8}
                      fill="#E53935"
                      stroke="#FFFFFF"
                      strokeWidth={2}
                    />
                  </Svg>
                );
              }}
            />
          </ScrollView>
        </View>

        {/* Legend */}
        <View style={styles.legendContainer}>
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendLine, { backgroundColor: 'rgba(74, 144, 217, 1)' }]} />
              <Text style={styles.legendText}>{t('median')}</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendLine, { backgroundColor: 'rgba(255, 180, 100, 0.8)' }]} />
              <Text style={styles.legendText}>±1 SD</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendLine, { backgroundColor: 'rgba(255, 100, 100, 0.6)' }]} />
              <Text style={styles.legendText}>±2 SD</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  selectorContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  selector: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  selectorButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  selectorButtonActive: {
    backgroundColor: '#4A90D9',
  },
  selectorIcon: {
    fontSize: 20,
  },
  selectorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  selectorTextActive: {
    color: '#FFFFFF',
  },
  chartTypeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  chartTypeButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  chartTypeButtonActive: {
    backgroundColor: '#E8F1FB',
    borderWidth: 2,
    borderColor: '#4A90D9',
  },
  chartTypeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
  },
  chartTypeTextActive: {
    color: '#4A90D9',
    fontWeight: '700',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    paddingRight: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  chartSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
  },
  childPointInfo: {
    backgroundColor: '#FFEBEE',
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  childPointText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#E53935',
    textAlign: 'center',
  },
  chart: {
    borderRadius: 16,
    marginLeft: -8,
  },
  legendContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendLine: {
    width: 16,
    height: 3,
    borderRadius: 2,
    marginRight: 4,
  },
  legendText: {
    fontSize: 11,
    color: '#666',
  },
});
