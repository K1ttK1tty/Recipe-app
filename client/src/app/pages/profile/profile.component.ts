import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PushNotificationsService } from 'src/app/services/push-notifications.service';

import { allDiets, allIntolerances } from 'src/app/components/filter-component/data';

import { IUser, IUserInfo } from 'src/app/models/UserModel';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
    constructor(
        private authService: AuthService,
        private pushNotificService: PushNotificationsService,
    ) {}
    isEditMode = false;
    userName = this.user?.name;
    profileInfo = this.user?.data.profileInfo;
    diets: string[] = allDiets;
    intolerances: string[] = allIntolerances;
    selectedDiets: string[] = [];
    selectedIntolerances: string[] = [];
    user?: IUser;
    subscription$ = this.authService.getUser().subscribe(observer => {
        this.user = observer;
        this.userName = this.user?.name;
        this.profileInfo = this.user?.data?.profileInfo;
        this.selectedIntolerances = this?.user.data?.filterData.intolerances;
        this.selectedDiets = this?.user.data?.filterData.diets;
    });
    public changeProfileInfo(): void {
        this.isEditMode = false;
        const oldUser = this.user as IUser;
        const newUser: IUser = {
            ...oldUser,
            name: this.userName as string,
            data: {
                ...oldUser.data,
                profileInfo: this.profileInfo as string,
                filterData: { intolerances: this.selectedIntolerances, diets: this.selectedDiets },
            },
        };
        this.uploadData(oldUser.email, this.userName as string, {
            profileInfo: this.profileInfo as string,
            intolerances: this.selectedIntolerances,
            diets: this.selectedDiets,
        });
        this.authService.updateUser(newUser);
        console.log(this.user);
    }
    public getDietState(diet: string): boolean {
        return this.selectedDiets?.includes(diet);
    }
    public toggleSelectedDiets(diet: string): void {
        if (!this.selectedDiets.includes(diet)) {
            this.selectedDiets.push(diet);
            console.log(this.selectedDiets);
        } else {
            this.selectedDiets = this.selectedDiets.filter(currentDiet => currentDiet !== diet);
            console.log(this.selectedDiets);
        }
    }
    public getIntoleranceState(intolerance: string): boolean {
        return this.selectedIntolerances?.includes(intolerance);
    }
    public toggleSelectedIntolerances(intolerance: string): void {
        if (!this.selectedIntolerances.includes(intolerance)) {
            this.selectedIntolerances.push(intolerance);
            console.log(this.selectedIntolerances);
        } else {
            this.selectedIntolerances = this.selectedIntolerances.filter(
                currentIntolerance => currentIntolerance !== intolerance,
            );
            console.log(this.selectedIntolerances);
        }
    }
    public uploadData(email: string, name: string, userInfo: IUserInfo): void {
        this.authService.uploadData(email, name, userInfo);
    }
    public logOut(): void {
        this.authService.logOut();
    }
    public registratePushNotifications(): void {
        this.pushNotificService.addSubscription();
    }
    public sendPushNotification(): void {
        this.pushNotificService.sendMessage('There is an instruction "how to protect yourself from a group of wolves"');
    }
}
