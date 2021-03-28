/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import axios from 'axios';
import {BASE_URL} from '../config/'
import { UserContext } from '../contexts/UserContext';
// 1. Import the modules.
import BackgroundFetch from 'react-native-background-fetch';
import PushNotification from 'react-native-push-notification';
export const Notification = () => {


  const user = React.useContext(UserContext);

  // 2. Add the following useEffect hook.
  useEffect(() => {
    // Push notifications setup (recommend extracting into separate file)
    PushNotification.configure({
      // onNotification is called when a notification is to be emitted
      onNotification: notification => console.log(notification),
      popInitialNotification: true,
    });
    // Background fetch setup (recommend extracting into separate file)
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // fetch interval in minutes
      },
      async taskId => {
        console.log('Received background-fetch event: ', taskId);

        // 3. Insert code you want to run in the background, for example:
        PushNotification.localNotification({
          title: 'Cold Weather Alert',
          message: `It's 23C degrees outside.`,
          playSound: true,
          soundName: 'default',
        });

        PushNotification.localNotificationSchedule({
          //... You can use all the options from localNotifications
          message: "My Notification Message", // (required)
          date: new Date(Date.now() + 60 * 1000), // in 60 secs
          allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
        });
        // Call finish upon completion of the background task
        BackgroundFetch.finish(taskId);
      },
      error => {
        console.error('RNBackgroundFetch failed to start.');
      },
    );
  }, [user.token]);
};