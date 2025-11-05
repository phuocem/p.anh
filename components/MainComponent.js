import React, { Component } from 'react';
import { View, Text, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Icon, Image } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchLeaders, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';

import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { baseUrl } from '../shared/baseUrl';

// ----- Redux mapDispatchToProps -----
const mapDispatchToProps = (dispatch) => ({
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos())
});

// ----- Home Navigator -----
function HomeNavigatorScreen() {
  const HomeNavigator = createStackNavigator();
  return (
    <HomeNavigator.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}
    >
      <HomeNavigator.Screen
        name='Home'
        component={Home}
        options={({ navigation }) => ({
          headerTitle: 'Home',
          headerLeft: () => (
            <Icon
              name='menu'
              size={36}
              color='#fff'
              onPress={() => navigation.toggleDrawer()}
            />
          )
        })}
      />
    </HomeNavigator.Navigator>
  );
}

// ----- About Navigator -----
function AboutNavigatorScreen() {
  const AboutNavigator = createStackNavigator();
  return (
    <AboutNavigator.Navigator
      initialRouteName='About'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}
    >
      <AboutNavigator.Screen
        name='About'
        component={About}
        options={({ navigation }) => ({
          headerTitle: 'About Us',
          headerLeft: () => (
            <Icon
              name='menu'
              size={36}
              color='#fff'
              onPress={() => navigation.toggleDrawer()}
            />
          )
        })}
      />
    </AboutNavigator.Navigator>
  );
}

// ----- Menu Navigator -----
function MenuNavigatorScreen() {
  const MenuNavigator = createStackNavigator();
  return (
    <MenuNavigator.Navigator
      initialRouteName='Menu'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}
    >
      <MenuNavigator.Screen
        name='Menu'
        component={Menu}
        options={({ navigation }) => ({
          headerTitle: 'Menu',
          headerLeft: () => (
            <Icon
              name='menu'
              size={36}
              color='#fff'
              onPress={() => navigation.toggleDrawer()}
            />
          )
        })}
      />
      <MenuNavigator.Screen
        name='Dishdetail'
        component={Dishdetail}
        options={{
          headerTitle: 'Dish Detail'
        }}
      />
    </MenuNavigator.Navigator>
  );
}

// ----- Contact Navigator -----
function ContactNavigatorScreen() {
  const ContactNavigator = createStackNavigator();
  return (
    <ContactNavigator.Navigator
      initialRouteName='Contact'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}
    >
      <ContactNavigator.Screen
        name='Contact'
        component={Contact}
        options={({ navigation }) => ({
          headerTitle: 'Contact Us',
          headerLeft: () => (
            <Icon
              name='menu'
              size={36}
              color='#fff'
              onPress={() => navigation.toggleDrawer()}
            />
          )
        })}
      />
    </ContactNavigator.Navigator>
  );
}

// ----- Custom Drawer Content -----
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          backgroundColor: '#7cc',
          height: 80,
          alignItems: 'center',
          flexDirection: 'row'
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: baseUrl + 'images/logo.png' }}
            style={{ margin: 10, width: 80, height: 60 }}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>
            AnhTP
          </Text>
        </View>
      </View>

      <DrawerItemList {...props} />

      <DrawerItem
        label='Help'
        icon={({ focused, color, size }) => (
          <Icon
            name='help'
            size={size}
            color={focused ? '#7cc' : '#ccc'}
          />
        )}
        onPress={() =>
          Linking.openURL('https://www.facebook.com/ntq.ginn/')
        }
      />
    </DrawerContentScrollView>
  );
}

// ----- Main Drawer Navigator -----
function MainNavigatorScreen() {
  const MainNavigator = createDrawerNavigator();
  return (
    <MainNavigator.Navigator
      initialRouteName='HomeScreen'
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <MainNavigator.Screen
        name='HomeScreen'
        component={HomeNavigatorScreen}
        options={{
          title: 'Home',
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon name='home' size={size} color={focused ? '#7cc' : '#ccc'} />
          )
        }}
      />
      <MainNavigator.Screen
        name='AboutScreen'
        component={AboutNavigatorScreen}
        options={{
          title: 'About Us',
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon name='info' size={size} color={focused ? '#7cc' : '#ccc'} />
          )
        }}
      />
      <MainNavigator.Screen
        name='MenuScreen'
        component={MenuNavigatorScreen}
        options={{
          title: 'Menu',
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon name='menu' size={size} color={focused ? '#7cc' : '#ccc'} />
          )
        }}
      />
      <MainNavigator.Screen
        name='ContactScreen'
        component={ContactNavigatorScreen}
        options={{
          title: 'Contact Us',
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon name='contacts' size={size} color={focused ? '#7cc' : '#ccc'} />
          )
        }}
      />
    </MainNavigator.Navigator>
  );
}

// ----- Main Component -----
class Main extends Component {
  componentDidMount() {
    this.props.fetchLeaders();
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
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
