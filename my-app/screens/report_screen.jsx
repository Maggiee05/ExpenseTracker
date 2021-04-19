import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity,
} from 'react-native';
import {
  LineChart, PieChart,
} from 'react-native-chart-kit';
import { Icon } from 'react-native-elements';
import styles from '../style';
import { UserContext } from '../navigator/context';
import { getMonthly, getCategory } from '../database/report_db';

/**
 * The chart configuration, required parameter for react-native-chart-kit
 */
const chartConfig = {
  backgroundColor: '#ebe4c8',
  backgroundGradientFrom: '#f0f8ff',
  backgroundGradientTo: '#f0ffff',
  backgroundGradientToOpacity: 0.5,
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(105, 105, 105, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#808080',
  },
  barPercentage: 2,
  strokeWidth: 5,
  useShadowColorFromDataset: false,
};

/**
 * The report screen
 * User can choose to load either:
 *      monthly balance linechart, categorical expense pie chart, or categorical income pie chart
 * TO DO: Share button handler
 */

export default class ReportScreen extends Component {
  static navigationOptions = {
    title: 'Report',
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      currUser: '',
      data: '', // data used to generate charts, get from database
      total: 0,
      renderCategoryExpense: false,
      renderCategoryIncome: false,
      renderTime: false, // whether the user changed the goal once
    };
  }

  componentDidMount() {
    const currUser = this.context;
    this.setState({ currUser: currUser.user });
  }

  // generate monthly balance linechart
  monthHandler = async (user) => {
    const result = await getMonthly(user);
    this.setState({
      data: result, renderTime: true, renderCategoryExpense: false, renderCategoryIncome: false,
    });
  }

  // generate categorical expense pie chart
  catExpenseHandler = async (user) => {
    const result = await getCategory(user, 0);
    this.setState({
      data: result[0],
      total: result[1],
      renderTime: false,
      renderCategoryExpense: true,
      renderCategoryIncome: false,
    });
  }

  // generate categorical income pie chart
  catIncomeHandler = async (user) => {
    const result = await getCategory(user, 1);
    this.setState({
      data: result[0],
      total: result[1],
      renderTime: false,
      renderCategoryExpense: false,
      renderCategoryIncome: true,
    });
  }

  render() {
    const {
      currUser, renderTime, data, renderCategoryExpense, total, renderCategoryIncome,
    } = this.state;
    return (

      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={() => this.monthHandler(currUser)} style={styles.chartLabel}>
            <Text style={styles.chartText}>Monthly balance</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.catExpenseHandler(currUser)}
            style={styles.chartLabel}
          >
            <Text style={styles.chartText}>Categorical expense</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.catIncomeHandler(currUser)}
            style={styles.chartLabel}
          >
            <Text style={styles.chartText}>Categorical income</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: '10%' }}>
          {
            renderTime
          && (
            <LineChart
              data={data}
              width={400}
              height={260}
              chartConfig={chartConfig}
            />
          )
          }
        </View>

        <View>
          {
          renderCategoryExpense
          && (
          <View>
            <Text style={styles.chartTitle}>
              Total Expense is $
              {total}
            </Text>
            <PieChart
              data={data}
              width={400}
              height={260}
              chartConfig={chartConfig}
              accessor="population"
              paddingLeft="15"
              center={[10, 20]}
            />
          </View>
          )
        }
        </View>

        <View>
          {
          renderCategoryIncome
          && (
          <View>
            <Text style={styles.chartTitle}>
              Total Income is $
              {total}
            </Text>
            <PieChart
              data={data}
              width={400}
              height={260}
              chartConfig={chartConfig}
              accessor="population"
              paddingLeft="15"
              center={[10, 20]}
            />
          </View>
          )
        }
        </View>

        <TouchableOpacity style={styles.reset}>
          <Icon reverse name="share" size={20} color="#b0c4de" />
        </TouchableOpacity>

      </View>
    );
  }
}

ReportScreen.contextType = UserContext;
