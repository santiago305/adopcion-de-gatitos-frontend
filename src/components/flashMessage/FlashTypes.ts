export type FlashType = 
"error" 
| "success" 
| "warning" 
| "info";

export interface FlashMessageType {
    message: {
      type: FlashType;
      text: string;
    };
  }

export interface MessageProps {
    type: string;
    text: string;
    icon?: React.ReactNode;
    color: string; 
}