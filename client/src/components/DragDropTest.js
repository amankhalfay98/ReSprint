// import React,{ useState, useEffect } from 'react';
// import '../App.css';

// import Api from '../services/api'

// const DragDrop = () => {
      
// //   useEffect(() => {
// //     const api = new Api();
// //     async function getAllProjects() {
// //       try {
// //         const {projects } = await api.getAllProjects() ;
// //         console.log(projects);
// //         if (projects) setProjectData(projects.totalsprints);
// //       } catch (error) {
// //         console.log(error.message);
// //       }
// //     }
// //     getAllProjects();
// //   }, []);
 


//   return (
//     <div className="drag-n-drop">
//             <div className="dnd-group">
//               <div className="group-title">Group 1</div>
//               <div className="dnd-item">
//                 <div>
//                   <p>ITEM 1</p>
//                 </div>
//               </div>
//               <div className="dnd-item">
//                 <div>
//                   <p>ITEM 2</p>
//                 </div>
//               </div>
//               <div className="dnd-item">
//                 <div>
//                   <p>ITEM 3</p>
//                 </div>
//               </div>
//             </div>
//             <div className="dnd-group">
//             <div className="group-title">Group 1</div>
//               <div className="dnd-item">
//                 <div>
//                   <p>ITEM 1</p>
//                 </div>
//               </div>
//               <div className="dnd-item">
//                 <div>
//                   <p>ITEM 2</p>
//                 </div>
//               </div>
//             </div>
//           </div> 
//   )
// }

// export default DragDrop;


// function App() {
//   const [data, setData] = useState();  
//   useEffect(() => {
//     if (localStorage.getItem('List')) {
//       console.log(localStorage.getItem('List'))
//       setData(JSON.parse(localStorage.getItem('List')))
//     } else {
//       setData(defaultData)
//     }
//   }, [setData])
//   return (
//     <div className="App">
//       <header className="App-header">
//       <DragNDrop data={data} />
//       {/* <div className="drag-n-drop">
//         {data.map((grp, grpI) => (
//           <div key={grp.title} className="dnd-group">
//             {grp.items.map((item, itemI) => (
//               <div draggable key={item} className="dnd-item">
//                 {item}
//               </div>
//             ))}
//           </div>
//         ))}
//         </div> */}

//           {/* <div className="drag-n-drop">
//             <div className="dnd-group">
//               <div className="group-title">Group 1</div>
//               <div className="dnd-item">
//                 <div>
//                   <p>ITEM 1</p>
//                 </div>
//               </div>
//               <div className="dnd-item">
//                 <div>
//                   <p>ITEM 2</p>
//                 </div>
//               </div>
//               <div className="dnd-item">
//                 <div>
//                   <p>ITEM 3</p>
//                 </div>
//               </div>
//             </div>
//             <div className="dnd-group">
//             <div className="group-title">Group 1</div>
//               <div className="dnd-item">
//                 <div>
//                   <p>ITEM 1</p>
//                 </div>
//               </div>
//               <div className="dnd-item">
//                 <div>
//                   <p>ITEM 2</p>
//                 </div>
//               </div>
//             </div>
//           </div> */}
//       </header>
//     </div>
//   );
// }


