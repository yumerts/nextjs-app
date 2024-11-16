import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth'; // Update with actual import
import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';
import { ENV } from '@pushprotocol/restapi/src/lib/constants';
import toast, { Toaster } from 'react-hot-toast';
import { useJoinGameModal } from './join_game_modal_provider';

interface NotificationContextType {

}
  
const PushNotificationContext = createContext<NotificationContextType | null>(null);

export const PushNotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const {ready, authenticated} = usePrivy();
    const {ready: walletsReady, wallets} =  useWallets();
    const [pushUser, setPushUser] = useState<PushAPI | null>(null);
    const {openModal} = useJoinGameModal();
    
    const target_channel = process.env.NEXT_PUBLIC_PUSH_NOTIFICATION_CHANNEL;


    useEffect(() => {
      const setupPushProfile = async () => {
          await wallets[0].switchChain(421614)
          const provider = await wallets[0].getEthersProvider();
          let signer = (provider.getSigner());  
          setPushUser(await PushAPI.initialize(signer, {
              env: ENV.STAGING,
          }))
      }
      setupPushProfile()
    }, [walletsReady]);

    useEffect(() => {
        
      const setupWebsocketNotificationService = async () => {
          if(!pushUser) return;

          let pushWebSocket = await pushUser.initStream([CONSTANTS.STREAM.NOTIF], {
              filter: {
                  channels: [target_channel!],
              },
              connection: {
                  retries: 3,
              },
              raw: false
          })
          
          pushWebSocket.on(CONSTANTS.STREAM.NOTIF, (data: any) => {
              toast("Notification received: " + data["message"]["payload"]["body"])
              console.log(data["message"]["payload"]);
              if(String(data["message"]["payload"]["cta"]).includes("join")){
                openModal(Number(String(data["message"]["payload"]["cta"]).split(" ")[1]));
              }
          })     

          console.log("websocket connected")
          pushWebSocket.connect()
      }

      const setupChannelSubscription = async () => {
          if(!pushUser) return

          const subscribeToChannel = async () => {
              if (!pushUser) return;
      
              const subscribeStatus = await pushUser.notification.subscribe("eip155:421614:0xB0905Eddb1E309589d5d5d9534F38C1960902Aa8".toLowerCase(), {
                  
              });
      
              console.log(subscribeStatus);
          }
          
          
          let subscriptions = await pushUser.notification.subscriptions();

          let foundSubscription = false;
          subscriptions.forEach((subscription: any) => {
              if(subscription.channel == target_channel){
                  foundSubscription = true;
                  return;
              }
          });
          
          if(!foundSubscription){
              await subscribeToChannel()
          }

      }

      setupChannelSubscription()
      setupWebsocketNotificationService()
  }, [pushUser]);

    return (
      <PushNotificationContext.Provider value={{ ready, authenticated, walletsReady, wallets }}>
        {children}
      </PushNotificationContext.Provider>
    );
  };