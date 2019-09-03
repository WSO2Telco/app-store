import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem } from "../../../app.data.models";

import { NavigationEnd } from "@angular/router";
@Component({
  selector: "store-main-menu",
  templateUrl: "./main-menu.component.html",
  styleUrls: ["./main-menu.component.scss"]
})
export class MainMenuComponent implements OnInit {
  public urlPath = "home";

  selectedMenu: MenuItem;
  flatternMenu: MenuItem[];

  public mainMenu: MenuItem[] = [
    {
      id: 1,
      name: "HOME",
      icon: "home",
      route: ["home"]
    },
    {
      id: 2,
      name: "APIS",
      icon: "extension",
      route: ["apis"]
    },
    {
      id: 3,
      name: "APPLICATIONS",
      icon: "apps",
      route: ["applications"]
    },
    {
      id: 4,
      name: "FORUM",
      icon: "forum",
      route: ["forum"]
    },
    // {
    //   id: 5,
    //   name: "STATISTICS",
    //   icon: "insert_chart",
    //   route: [],
    //   subMenu: [
    //     {
    //       id: 5.1,
    //       name: "API USAGE",
    //       icon: "data_usage",
    //       route: ["statistics/api-usage"]
    //     },
    //     {
    //       id: 5.2,
    //       name: "TOP USERS",
    //       icon: "supervisor_account",
    //       route: ["statistics/top-users"]
    //     },
    //     {
    //       id: 5.3,
    //       name: "RESOURCE USAGE",
    //       icon: "monetization_on",
    //       route: ["statistics/resource-usage"]
    //     },
    //     {
    //       id: 5.4,
    //       name: "FAULTY INVOCATIONS",
    //       icon: "error_outline",
    //       route: ["statistics/faulty-invocations"]
    //     },
    //     {
    //       id: 5.5,
    //       name: "MANAGE ALERT TYPES",
    //       icon: "add_alert",
    //       route: ["statistics/manage-alert-typesx"]
    //     }
    //   ]
    // }
  ];

  constructor() {
  }

  ngOnInit() {
  }
}
