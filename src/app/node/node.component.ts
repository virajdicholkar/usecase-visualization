import { Component, OnInit, Input } from '@angular/core';
import { TreelistService } from '../treelist.service';

// import {Subscription} from 'rxjs';
// import {timer} from 'rxjs';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {
  @Input() node;
  selectedNodeID: string;
  nodeId: string;
  ticks = 0;
  public hideChildrenList;
  mouseDownX: string;
  mouseDownY: string;
  runbook = ''
  currentlyHoveringId: string;

  constructor(private treelistsvc: TreelistService) {
    this.treelistsvc.hideChilrenToggler$.subscribe((status) => {
      this.hideChildrenList = treelistsvc.hideChildrenOfIds;
    });
    this.treelistsvc.hoverNodeToggler$.subscribe((status) => {
      this.currentlyHoveringId = treelistsvc.currentlyHoveringId;
    });
    this.hideChildrenList = [];
  }


  ngOnInit() {
    this.node
    console.log('this.node', this.node)
  }

  shouldShowPopup(id) {
    return this.currentlyHoveringId === id;
  }

  hideChilren(id) {
    this.treelistsvc.hideNodeChilren(id);
  }

  mouseDown(nodeID: string, selectedNode, event) {
    // console.log('mouse down: ' + this.ticks);
    if (event.target.id !== 'expandbutton') {
      this.mouseDownX = event.clientX;
      this.mouseDownY = event.clientY;
    }
  }

  mouseUp(nodeID: string, selectedNode, event) {
  }

  getSelectedNodeID() {
  }

  mouseEnter(id, event) {
    console.log('enter');
    this.treelistsvc.setCurrentlyHoveringId(id);
  }

  mouseLeave(id, event) {
    console.log('leaving');
    this.treelistsvc.setCurrentlyHoveringId('');
  }

  shouldHideChildren(id) {
    return this.treelistsvc.hideChildrenOfIds.includes(id);
  }

  addChild(node, selectedValue) {
    console.log('node', node);
    console.log('node', node.runbook);
    if(selectedValue === 'STOP'){
      this.treelistsvc.removeChild(node.id)
    } else if(!node.children.length){
      this.treelistsvc.addChild(node.id);
    }
  }
}
