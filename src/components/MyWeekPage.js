import React from 'react';
import { connect } from 'react-redux';
import { saveUser } from '../actions/user';
import MyWeekCard from './MyWeekCard';


export class MyWeekPage extends React.Component {

    onHandleClick =(e) => {
        alert(e.target.value);
    }

    render(){
        return (
            <div> 
                <MyWeekCard day={'monday'} dayMeals={this.props.user.my_week.monday}/>
                <MyWeekCard day={'tuesday'} dayMeals={this.props.user.my_week.tuesday} />   
                <MyWeekCard day={'wednesday'} dayMeals={this.props.user.my_week.wednesday} />   
                <MyWeekCard day={'thursday'} dayMeals={this.props.user.my_week.thursday} />   
                <MyWeekCard day={'friday'} dayMeals={this.props.user.my_week.friday} />   
                <MyWeekCard day={'saturday'} dayMeals={this.props.user.my_week.saturday} />   
                <MyWeekCard day={'sunday'} dayMeals={this.props.user.my_week.sunday} />       
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    saveUser: (user) => dispatch(saveUser(user))
});

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(MyWeekPage);  