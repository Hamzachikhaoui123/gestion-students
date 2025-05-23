import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway({ namespace: 'notifications' })
  export class NotificationsGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
  {
    @WebSocketServer() server: Server;
  
    afterInit(server: Server) {
      console.log('WebSocket server initialized');
    }
  
    handleConnection(client: Socket) {
      console.log('Client connected: ', client.id);
    }
  
    handleDisconnect(client: Socket) {
      console.log('Client disconnected: ', client.id);
    }
  
    /**
     * Méthode pour émettre une notification à tous les clients connectés.
     */
    public sendNotification(notification: any) {
      this.server.emit('notification', notification);
    }


  }
  