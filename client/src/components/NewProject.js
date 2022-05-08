import React from 'react';
import '../App.css';
import { Button } from '@material-ui/core';
import Api from '../services/api'

function NewProject() {
    const api = new Api();
    let totalSprints;
    let projectName;
    let companyName;

//     const [projectData, setProjectData] = useState(undefined);
//   useEffect(() => {
//     const api = new Api();
//     async function upsertProject() {
//       try {
//         const {projects } = await api.upsertProject(master,projectName,company,userStories,members,totalSprints,memberId) ;
//         console.log(projects);
//         if (projects) setProjectData(projects);
//       } catch (error) {
//         console.log(error.message);
//       }
//     }
//     upsertProject();
//   }, []);
    //const [addImage] = useMutation(queries.ADD_IMAGE);
    
    return (
        <form
        className='form'
        id='add-project'
        onSubmit={(e) => {
          console.log(totalSprints.value);
          console.log(projectName.value);
          console.log(companyName.value);
          e.preventDefault();
         try{
           if(!projectName.value){
             throw Error('Project Name is Required');
           }
           api.upsertProject({
            variables: {
              totalSprints: totalSprints.value,
              projectName: projectName.value,
              company: companyName.value,
              userStories: [],
              members: [],
              master: '2bbbb2cb-e892-4876-8866-4b79bd7b4bf7',
              memberId: '2bbbb2cb-e892-4876-8866-4b79bd7b4bf7'
            }
          });
          totalSprints.value = '';
          projectName.value = '';
          companyName.value = '';
          window.location.pathname = '/backlog';
        }catch(err){
          alert(err.message);
        }
        }}
      >
          <h2>Add New Project</h2>
        <div className='form-group'>
          <label>
            Total Sprints:
            <br />
            <input required type='number'
              ref={(node) => {
                totalSprints = node;
              }}
              autoFocus={true}
            />
          </label>
        </div>
        <br />
        <div className='form-group'>
          <label>
            Project Name:
            <br />
            <input 
              ref={(node) => {
                projectName = node;
              }}
            />
          </label>
        </div>
        <br />

        <div className='form-group'>
          <label>
            Company Name:
            <br />
            <input 
            ref={(node) => {
                companyName = node;
              }}
            />
          </label>
        </div>
        <br />
        <br />
        <Button variant='outlined'  type='submit'>Submit</Button>
      </form>
    );
}

export default NewProject
