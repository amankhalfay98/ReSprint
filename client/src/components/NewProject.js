import React, {useContext,useState,useEffect} from 'react';
import '../App.css';
import { Button } from '@material-ui/core';
import Api from '../services/api'
import { AuthContext } from '../firebase/Auth';

function NewProject() {
    const api = new Api();
    const { currentUser } = useContext(AuthContext);
	console.log('This is coming from the New Project Component: ', currentUser.uid);
    let totalSprints;
    let projectName;
    let companyName;
    //const [companyList,setCompanyList] = useState(undefined);
    const [memberList,setMemberList] = useState(undefined);
    const [user, setUser] = useState(undefined);

// useEffect(() => {
  //   const api = new Api();
  //   async function getAllCompanies() {
  //     try {
  //       const {companies } = await api.getAllCompanies() ;
  //       console.log(companies);
  //       if (companies) setCompanyList(companies);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }
  //   getAllCompanies();
  // }, []);

  useEffect((currentUser) => {
    //const api = new Api();
    async function getUserById() {
      try {
        const {user } = await api.getUserById('9LaXAim6PZVppWwMajyH93vG0dt2') ; //get session id
        console.log(user);
        if (user) setUser(user);
      } catch (error) {
        console.log(error.message);
      }
    }
    getUserById();
  }, [currentUser,api]);

  useEffect(() => {
    const api = new Api();
    async function getAllMembers() {
      try {
     if(companyName.value.length>0){
        const {members } = await api.getAllMembers('e80df368-8ccc-4da2-8017-1f4936fbe20a') ;
        console.log(members);
        if (members) setMemberList(members);
       }
      } catch (error) {
        console.log(error.message);
      }
    }
    getAllMembers();
  }, [companyName]);



	// let companies = companyList.length > 0
	// 	&& companyList.map((company, i) => {
	// 	return (
  //   optionGenerator(company)
	// 		<option key={i} value={item.id}>{item.name}</option>
	// 	)
	// });

  	let members = memberList.length > 0
		&& memberList.map((member, i) => {
		return (
    optionGenerator(member,i)
			// <option key={i} value={item.id}>{item.name}</option>
		)
	});

  const optionGenerator = (item,i)=> {
    return(
      <option key={i} value={item.id}>{item.name}</option>
      )
    
  }
    
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
            //variables: {
              totalSprints: parseInt(totalSprints.value),
              projectName: projectName.value,
              company: companyName.value,
              userStories: [],
              members: [],
              master: '2bbbb2cb-e892-4876-8866-4b79bd7b4bf7',
              memberId: '2bbbb2cb-e892-4876-8866-4b79bd7b4bf7'
           // }
          });
          totalSprints.value = '';
          projectName.value = '';
          companyName.value = '';
          alert('Project is created');
          window.location.pathname = '/projects';
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
            <input disabled
            defaultValue={user.companyName}
            ref={(node) => {
                companyName = node;
              }}
            />
            {/* <select name="company" id="company">
    <option value="">--Please choose an option--</option>
    {companies}
</select> */}
          </label>
        </div>
        <select multiple name="members" id="members">
            <option value="">--Please choose an option--</option>
            {members}
        </select>
        <br />
        <br />
        <Button variant='outlined'  type='submit'>Submit</Button>
      </form>
    );
}

export default NewProject
