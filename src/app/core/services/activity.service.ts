import { Injectable } from "@angular/core";
import { Activity, ActivityType } from "../models/activity.model";

@Injectable({
  providedIn: "root",
})
export class ActivityService {
  // activity type mapping
  private activityTypeMappingOptions: ActivityType = {
    Message: {
      title: "added a note to",
      icon: "fas fa-message",
    },
    Phone: {
      title: "a call with",
      icon: "fas fa-phone",
    },
    Coffee: {
      title: "a coffee with",
      icon: "fas fa-coffee",
    },
    Beer: {
      title: "a party with",
      icon: "fas fa-beer",
    },
    "Meeting Note": {
      title: "a meeting with",
      icon: "fas fa-user",
    },
  };

  private defaultActivityList: Activity[] = [
    {
      id: 1733491597601,
      user: "You",
      timestamp: new Date("2024-12-03T13:26:37.601Z"),
      type: "Meeting Note",
      note: "And a formal meeting.",
    },
    {
      id: 1733491437578,
      user: "You",
      timestamp: new Date("2024-12-01T13:23:57.578Z"),
      type: "Phone",
      note: "Then we had a follow-up phone call.",
    },
    {
      id: 1733488991754,
      user: "You",
      timestamp: new Date("2024-11-30T12:43:11.754Z"),
      type: "Coffee",
      note: "We had a coffee!",
    },
    {
      id: 1733482854916,
      user: "You",
      timestamp: new Date("2024-11-22T11:00:54.916Z"),
      type: "Meeting Note",
      note: "A test note of messafe type!",
    },
  ];

  /**
   * Get the activity lists
   * @returns
   */
  getActivityList(): Activity[] {
    if (!localStorage.getItem("ActivityList")) {
      localStorage.setItem(
        "ActivityList",
        JSON.stringify(this.defaultActivityList)
      );
    }
    return JSON.parse(localStorage.getItem("ActivityList") || "[]");
  }

  /**
   * Create new activity.
   * @param activityPayload - the payload to be created activity for.
   */
  addNewActivity(activityPayload: Activity): void {
    const activityList = this.getActivityList();
    activityList.push(activityPayload);
    activityList.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    localStorage.setItem("ActivityList", JSON.stringify(activityList));
  }

  /**
   * To delete the activity by id.
   * @param id - the activity id to be deleted.
   */
  deleteActivityById(id: number): void {
    const activityList = this.getActivityList();
    const filteredActivityList = activityList.filter((activity) => {
      return activity.id !== id;
    });
    localStorage.setItem("ActivityList", JSON.stringify(filteredActivityList));
  }

  /**
   * Getter for activityTypeMappingOptions
   * @returns activity type options
   */
  getActivityTypeMappingOptions(): ActivityType {
    return this.activityTypeMappingOptions;
  }
}
