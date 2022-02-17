import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-page-container',
    templateUrl: './page-container.component.html',
    styleUrls: ['./page-container.component.css']
})
export class PageContainerComponent implements OnInit {
    form = {
        name: '',
        city: '',
        description: '',
        exercise: '',
        newsletter: false
    };

    constructor() {
    }

    ngOnInit() {
        this.form = {
            name: 'Radha',
            city: 'Bengaluru',
            newsletter: true,
            description: 'I am learning Angular Forms',
            exercise: '3 times a week'
        };
    }

    onSubmit() {
        console.log(this.form);
    }
}
