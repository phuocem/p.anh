import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { View, Text, Linking } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { connect } from 'react-redux';
import { fetchLeaders, fetchDishes, fetchComments } from '../redux/ActionCreators';
const mapDispatchToProps = (dispatch) => ({
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments())  
});

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HEADER_COLOR = '#22adc5ff';

function HomeNavigatorScreen() {
  const HomeNavigator = createStackNavigator();
  return (
    <HomeNavigator.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: HEADER_COLOR },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff', fontWeight: 'bold' },
      }}
    >
     <HomeNavigator.Screen name='Home' component={Home}
        options={({ navigation }) => ({
          headerTitle: 'Home',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </HomeNavigator.Navigator>
  );
}

function AboutNavigatorScreen() {
  const AboutNavigator = createStackNavigator();
  return (
    <AboutNavigator.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#22adc5ff' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff', fontWeight: 'bold' },
      }}
    >
      <AboutNavigator.Screen
        name="About"
        component={About}
        options={({ navigation }) => ({
          headerTitle: 'About Us',
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </AboutNavigator.Navigator>
  );
}



function MenuNavigatorScreen() {
  const MenuNavigator = createStackNavigator();

  return (
    <MenuNavigator.Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerStyle: { backgroundColor: HEADER_COLOR },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff', fontWeight: 'bold' },
      }}
    >
      <MenuNavigator.Screen
        name="Menu"
        component={Menu}
        options={({ navigation }) => ({
          headerTitle: 'Menu',
          headerLeft: () => (
            <Icon
              name="menu"
              size={30}
              color="#fff"
              style={{ marginLeft: 15 }}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
      <MenuNavigator.Screen
        name="Dishdetail"
        component={Dishdetail}
        options={{
          headerTitle: 'Dish Detail',
        }}
      />
    </MenuNavigator.Navigator>
  );
}

function ContactNavigatorScreen() {
  const ContactNavigator = createStackNavigator();
  return (
    <ContactNavigator.Navigator
      initialRouteName="Contact"
      screenOptions={{
        headerStyle: { backgroundColor: '#22adc5ff' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff', fontWeight: 'bold' },
      }}
    >
      <ContactNavigator.Screen
        name="Contact"
        component={Contact}
        options={({ navigation }) => ({
          headerTitle: 'Contact Us',
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </ContactNavigator.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      {/* Header của Drawer */}
      <View
        style={{
          backgroundColor: '#22adc5ff',
          height: 100,
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 10,
        }}
      >
        <Image
          source={require('./images/logo.png')}
          style={{ width: 80, height: 60, marginRight: 10 }}
        />
        <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>
          AnhTP
        </Text>
      </View>

      {/* Danh sách các item mặc định */}
      <DrawerItemList {...props} />

      {/* Item tùy chỉnh thêm */}
      <DrawerItem
        label="Help"
        icon={({ focused, color, size }) => (
          <Icon
            name="help"
            size={size}
            color={focused ? '#22adc5ff' : '#ccc'}
          />
        )}
        onPress={() =>
          Linking.openURL('https://reactnavigation.org/docs/getting-started')
        }
      />
    </DrawerContentScrollView>
  );
}


function MainNavigatorScreen() {
  const MainNavigator = createDrawerNavigator();
  return (
    <MainNavigator.Navigator
      initialRouteName="HomeScreen"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false, // Ẩn header mặc định của Drawer
        drawerActiveTintColor: '#22adc5ff',
        drawerLabelStyle: { fontSize: 16, fontWeight: 'bold' },
      }}
    >
      <MainNavigator.Screen
        name="HomeScreen"
        component={HomeNavigatorScreen}
        options={{
          title: 'Home',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="home"
              size={size}
              color={focused ? '#22adc5ff' : '#ccc'}
            />
          ),
        }}
      />

      <MainNavigator.Screen
        name="AboutScreen"
        component={AboutNavigatorScreen}
        options={{
          title: 'About Us',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="info"
              size={size}
              color={focused ? '#22adc5ff' : '#ccc'}
            />
          ),
        }}
      />

      <MainNavigator.Screen
        name="MenuScreen"
        component={MenuNavigatorScreen}
        options={{
          title: 'Menu',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="list"
              size={size}
              color={focused ? '#22adc5ff' : '#ccc'}
            />
          ),
        }}
      />

      <MainNavigator.Screen
        name="ContactScreen"
        component={ContactNavigatorScreen}
        options={{
          title: 'Contact Us',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="contacts"
              size={size}
              color={focused ? '#22adc5ff' : '#ccc'}
            />
          ),
        }}
      />
    </MainNavigator.Navigator>
  );
}


class Main extends Component {
  componentDidMount() {
    // gọi redux action khi component được mount
    this.props.fetchLeaders();
    this.props.fetchDishes();
    this.props.fetchComments();
  }

  render() {
    return (
      <NavigationContainer>
        <MainNavigatorScreen />
      </NavigationContainer>
    );
  }
}

export default connect(null, mapDispatchToProps)(Main);
