import { MessageBarType } from 'office-ui-fabric-react';   
  
export interface IDatetimepickercontrolState{  
    projectTitle: string;  
    projectDescription: string;  
    startDate: Date;  
    endDate: Date;  
    showMessageBar: boolean;      
    messageType?: MessageBarType;      
    message?: string;
    gender:boolean; 
}