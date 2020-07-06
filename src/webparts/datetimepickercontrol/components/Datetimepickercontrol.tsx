import * as React from 'react';
import styles from './Datetimepickercontrol.module.scss';
import { IDatetimepickercontrolProps } from './IDatetimepickercontrolProps'; //Props
import { IDatetimepickercontrolState } from './IDatetimepickercontrolState'; //State
import { TextField } from 'office-ui-fabric-react/lib/TextField'; //Textfield
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup'; // Readio button
import { MessageBar, MessageBarType, IStackProps, Stack } from 'office-ui-fabric-react'; // Messagebar
import { autobind } from 'office-ui-fabric-react'; 
import { DateTimePicker, DateConvention, TimeConvention, TimeDisplayControlType } from '@pnp/spfx-controls-react/lib/dateTimePicker'; // Date and Time Picker
import { ListPicker } from "@pnp/spfx-controls-react/lib/ListPicker";

import { escape } from '@microsoft/sp-lodash-subset';

import { sp } from "@pnp/sp";  
import "@pnp/sp/webs";  
import "@pnp/sp/lists";  
import "@pnp/sp/items";

const verticalStackProps: IStackProps = {  
  styles: { root: { overflow: 'hidden', width: '100%' } },  
  tokens: { childrenGap: 20 }  
}; 


const options: IChoiceGroupOption[] = [
  { key: 'A', text: 'Male' },
  { key: 'B', text: 'Female' },
  
];
export default class Datetimepickercontrol extends React.Component<IDatetimepickercontrolProps, IDatetimepickercontrolState> {
  constructor(props: IDatetimepickercontrolProps, state: IDatetimepickercontrolState) {    
    super(props);    
    sp.setup({    
      spfxContext: this.props.context    
    });    
    this.state = {    
      projectTitle: '',    
      projectDescription: '',    
      startDate: new Date(),    
      endDate: new Date(),    
      showMessageBar: false,
      gender:false
    };    
  } 
  public render(): React.ReactElement<IDatetimepickercontrolProps> {
    return (
      <div className={styles.row}>  
      <h1>Create New Project</h1>  
      {  
        this.state.showMessageBar  
          ?  
          <div className="form-group">  
            <Stack {...verticalStackProps}>  
              <MessageBar messageBarType={this.state.messageType}>{this.state.message}</MessageBar>  
            </Stack>  
          </div>  
          :  
          null  
      }  
      <div className={styles.row}>  
        <TextField label="Project Title" required onChanged={this.__onchangedTitle} />  
        <TextField label="Project Description" required onChanged={this.__onchangedDescription} />
        <ChoiceGroup defaultSelectedKey="B" options={options} onChange={this._onChange} label="Gender" required={true} />
        
        <DateTimePicker label="Start Date"  
          dateConvention={DateConvention.DateTime}  
          timeConvention={TimeConvention.Hours12}  
          timeDisplayControlType={TimeDisplayControlType.Dropdown}  
          showLabels={false}  
          value={this.state.startDate}  
          onChange={this.__onchangedStartDate}  
        />  
        <DateTimePicker label="End Date"  
          dateConvention={DateConvention.Date}  
          timeConvention={TimeConvention.Hours12}  
          timeDisplayControlType={TimeDisplayControlType.Dropdown}  
          showLabels={false}  
          value={this.state.endDate}  
          onChange={this.__onchangedEndDate}  
        />  

<ListPicker context={this.props.context}  
              label="Select your list(s)"  
              placeHolder="Select your list(s)"  
              baseTemplate={100}  
              includeHidden={false}  
              multiSelect={false}  
              onSelectionChanged={this.onListPickerChange} />
        <div className={styles.button}>  
          <button type="button" className="btn btn-primary" onClick={this.__createItem}>Submit</button>  
        </div>  
      </div>  
    </div>  
    );
  }

  private onListPickerChange (lists: string | string[]) {  
    console.log("Lists: ", lists);  
}
  @autobind  
  private __onchangedTitle(title: any): void {  
    this.setState({ projectTitle: title });  
  }  
  
  @autobind  
  private __onchangedDescription(description: any): void {  
    this.setState({ projectDescription: description });  
  }  
  
  @autobind  
  private __onchangedStartDate(date: any): void {  
    this.setState({ startDate: date });  
  }  
  
  @autobind  
  private __onchangedEndDate(date: any): void {  
    this.setState({ endDate: date });  
  }  
  
  @autobind
  private _onChange(kuldeep:any):void{
    this.setState({gender:kuldeep})
  }
  @autobind  
  private async __createItem() {  
    try {  
      await sp.web.lists.getByTitle('Project Details').items.add({  
        Title: this.state.projectTitle,  
        Description: this.state.projectDescription,  
        StartDate: this.state.startDate,  
        EndDate: this.state.endDate,
      });  
      this.setState({  
        message: "Item: " + this.state.projectTitle + " - created successfully!",  
        showMessageBar: true,  
        messageType: MessageBarType.success  
      });  
    }  
    catch (error) {  
      this.setState({  
        message: "Item " + this.state.projectTitle + " creation failed with error: " + error,  
        showMessageBar: true,  
        messageType: MessageBarType.error  
      });  
    }  
  }  
}
