export interface MessageProcessing {
  doProcess(data: any): any;
  doCallback(data: any): any;
}
