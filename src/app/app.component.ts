import { Component, ViewChild, OnInit} from '@angular/core';

import { MatSidenav } from '@angular/material';

import data from '../assets/DatabaseLayout.json';

import { TreelistService } from './treelist.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app';

  public treeLists = [];
  public currentlySelectedTree;
  public currentlySelectedTreeId;
  @ViewChild('mySideNav', { static: true }) public myNav: MatSidenav;


  constructor (private treelistsvc: TreelistService) {
    console.log('data', data);
    for (const c of data.children) {
      const alist = [];
      alist.push(c);
      this.treeLists.push([alist]);
    }

    this.treelistsvc.setCurrentlySelectedTree(this.treeLists[0]);
    this.currentlySelectedTree = treelistsvc.currentlySelectedTree;
    this.currentlySelectedTreeId = this.currentlySelectedTree[0][0].id;

  }

  getData(){
    const data = this.treelistsvc.currentlySelectedTree[0][0];
    console.log('data', data)
    console.log(JSON.stringify(data))
  }
}
