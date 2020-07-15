import {observable, action, computed, runInAction, configure} from 'mobx'
import {createContext, SyntheticEvent} from 'react'
import {IActivity} from './../../models/activity';
import agent from '../agent';
import {act} from 'react-dom/test-utils';

configure({enforceActions: 'always'});

class ActivityStore {
    @observable activityRegistry = new Map();
    // @observable activities : IActivity[] = [];
    @observable loadingIntiial = false;
    @observable selectedActivity : IActivity | null = null;
    // @observable editMode = false;
    @observable submitting = true;
    @observable target = '';

    // @computed get activitiesByDate() {
    //     return Array
    //         .from(this.activityRegistry.values())
    //         .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    // }


    @computed get activitiesByDate() {
      return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()))
    }
  
    groupActivitiesByDate(activities: IActivity[]) {
      const sortedActivities = activities.sort(
        (a, b) => Date.parse(a.date) - Date.parse(b.date)
      )
      return Object.entries(sortedActivities.reduce((activities, activity) => {
        const date = activity.date.split('T')[0];
        activities[date] = activities[date] ? [...activities[date], activity] : [activity];
        return activities;
      }, {} as {[key: string]: IActivity[]}));
    }



    @action loadActivities = async() => {
        this.loadingIntiial = true;
        try {
            const activities = await agent
                .Activities
                .list();
            runInAction('loading activities', () => {
                activities.forEach(activity => {
                    activity.date = activity
                        .date
                        .split('.')[0];
                    this
                        .activityRegistry
                        .set(activity.id, activity);
                });
                this.loadingIntiial = false;
            })

        } catch (error) {
            runInAction('load activities error', () => {
                this.loadingIntiial = false;
            })
        }
    };

    @action loadActivity = async(id : string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
        } else {
            this.loadingIntiial = true;
            try {
                activity = await agent
                    .Activities
                    .details(id);
                runInAction('getting activity', () => {
                    this.selectedActivity = activity;
                    this.loadingIntiial = false;
                })
            } catch (error) {
                runInAction('get activity error', () => {
                    this.loadingIntiial = false;
                })
                console.log(error);
            }
        }
    }

    @action createActivity = async(activity : IActivity) => {
        this.submitting = true;
        try {
            await agent
                .Activities
                .create(activity);
            runInAction('create activity', () => {
                this
                    .activityRegistry
                    .set(activity.id, activity);
                this.submitting = false;
            })
        } catch (error) {
            runInAction('create activity error', () => {
                this.submitting = false;
            })
            console.log(error);
        }
    };

    @action editActivity = async(activity : IActivity) => {
        this.submitting = true;
        try {
            await agent
                .Activities
                .update(activity);
            runInAction('editing activity', () => {
                this
                    .activityRegistry
                    .set(activity.id, activity);
                this.selectedActivity = activity;
                this.submitting = false;
            })

        } catch (error) {
            runInAction('edit activity error', () => {
                this.submitting = false;
            })
            console.log(error);
        }
    };

    @action deleteActivity = async(event : SyntheticEvent < HTMLButtonElement >, id : string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent
                .Activities
                .delete(id);
            runInAction('deleting activity', () => {
                this
                    .activityRegistry
                    .delete(id);
                this.submitting = false;
                this.target = '';
            })
        } catch (error) {
            runInAction('delete activity error', () => {
                this.submitting = false;
                this.target = '';
            })
            console.log(error);
        }
    }

    // @action openCreateForm = () => {     this.selectedActivity = null; } @action
    // openEditForm = (id : string) => {     this.selectedActivity = this
    // .activityRegistry         .get(id); }
    @action cancelSelectedActivity = () => {
        this.selectedActivity = null;
    }

    // @action cancelFormOpen = () => {}

    @action selectActivity = (id : string) => {
        this.selectedActivity = this
            .activityRegistry
            .get(id);
    }
    @action clearActivity = () => {
        this.selectedActivity = null;
    }

    getActivity = (id : string) => {
        return this
            .activityRegistry
            .get(id);
    }

}

export default createContext(new ActivityStore())