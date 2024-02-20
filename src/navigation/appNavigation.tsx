import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import OnboardingScreen from '../components/onboarding.tsx';

const Stack = createNativeStackNavigator();
export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Onboarding'}>
        <Stack.Screen
          name={'Onboarding'}
          options={{headerShown: false}}
          component={OnboardingScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
