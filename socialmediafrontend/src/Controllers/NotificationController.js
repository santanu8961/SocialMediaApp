import React from 'react';
import { NotificationManager} from 'react-notifications';

var NotificationController = {};

NotificationController.createNotification = (type,msg) => {
    
      if (type === "info") {
        NotificationManager.info(msg);
      }else if(type === "success"){
        NotificationManager.success(msg, 'Success!');
        
      }else if (type === "warning"){
        NotificationManager.warning(msg, 'Close after 3000ms', 3000);
      }else if (type === "error"){
        NotificationManager.error(msg, 'Error', 5000);
        ;

      }
      
    };



export default NotificationController;