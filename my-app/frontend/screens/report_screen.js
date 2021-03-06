import React, { Component } from 'react';
import {
  View, TouchableOpacity, Share, Alert,
} from 'react-native';
import {
  LineChart, PieChart,
} from 'react-native-chart-kit';
import { Icon } from 'react-native-elements';
import { Text } from 'react-native-paper';
import styles from '../../style';
import { UserContext } from '../navigator/context';
import { getMonthly, getCategory } from '../../backend/database/report_db';
import { changeCurrency } from '../../backend/database/profile_db';

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
 * Come with a share button
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
      shareStatus: '',
      currency: '',
    };
  }

  componentDidMount = async () => {
    const currUser = this.context;
    const currency = await changeCurrency(currUser.user, 0);
    this.setState({ currUser: currUser.user, currency });
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
    this.componentDidMount();
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

  // share button handler, share report and generate status
  shareHandler = async () => {
    try {
      const result = await Share.share({
        message:
          'Your report of the expense tracker',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          const month = new Date().getMonth() + 1;
          const year = new Date().getFullYear();
          const date = new Date().getDate();
          // render sharing status
          this.setState({ shareStatus: `You've shared the report on ${month}/${date}/${year}` });
        } else {
          // shared, continue
        }
      } else if (result.action === Share.dismissedAction) {
        // share action dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  render() {
    const {
      currUser, renderTime, data, renderCategoryExpense, total,
      renderCategoryIncome, shareStatus, currency,
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
              Total Expense is
              {' '}
              {currency}
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
              Total Income is
              {' '}
              {currency}
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

        <TouchableOpacity style={{ position: 'absolute', bottom: 30, right: 40 }} onPress={() => this.shareHandler()}>
          <Icon reverse name="share" size={20} color="#b0c4de" />
        </TouchableOpacity>
        <Text style={{ position: 'absolute', bottom: 10, right: 10 }}>
          { shareStatus }
        </Text>

      </View>
    );
  }
}

ReportScreen.contextType = UserContext;
