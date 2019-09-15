// import React from 'react';

// import {Scheduler,  Resource } from 'devextreme-react/scheduler';

// import { employees, data } from './data.js';
// import DataCell from './DataCell.js';
// import ResourceCell from './ResourceCell.js';

// const currentDate = new Date().getDate()
// const groups = ['employeeID'];
// const views = ['month'];

// class App extends React.Component {
//   render() {
//     return (
//       <Scheduler
//         dataSource={data}
//         dataCellComponent={DataCell}
//         resourceCellComponent={ResourceCell}
//         groups={groups}
//         views={views}
//         defaultCurrentView={'month'}
//         defaultCurrentDate={currentDate}
//         height={600}
//         showAllDayPanel={true}
//         firstDayOfWeek={1}
//         startDayHour={6}
//         endDayHour={22}
//       >
//         <Resource
//           label={'Employee'}
//           fieldExpr={'employeeID'}
//           dataSource={employees}
//           allowMultiple={false}
//         />
//       </Scheduler>
//     );
//   }
// }



// import * as React from 'react';
 
// import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
// import 'jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css';
// import JqxScheduler, { ISchedulerProps } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxscheduler';
 
// class App extends React.PureComponent {
//     constructor(props) {
//         super(props);
 
//         this.state = {
//             width: '100%'
//             // Other Widget Props
//         }
//     }
   
//     render() {
//         return (
//             <JqxScheduler 
//                 width={this.state.width} height={"100%"} 
//             />
//         )
//     }
// }
// export default App;
