import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

    @Input() search: string;

    constructor(private router: Router
    ) {
    }

    ngOnInit() {
    }

    searching($value) {
       this.router.navigate(['/'], { queryParams: { search: $value }} );
    }
}
