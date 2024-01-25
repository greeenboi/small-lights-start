import UpcomingEvents from "./home/upcoming-events";
import DealsChart from "./home/deals-chart";
import UpcomingEventsSkeleton from "./skeleton/upcoming-events";
import AccordionHeaderSkeleton from "./skeleton/accordion-header";
import KanbanColumnSkeleton from "./skeleton/kanban";
import ProjectCardSkeleton from "./skeleton/project-card";
import LatestActivities from "./home/latest-activities";
import LatestActivitiesSkeleton from "./skeleton/latest-activities";
import DashboardTotalCountCard from "./home/total-count-card";

export { 
    UpcomingEvents, 
    DealsChart, 
    DashboardTotalCountCard,
    LatestActivities,
    UpcomingEventsSkeleton, 
    AccordionHeaderSkeleton, 
    KanbanColumnSkeleton, 
    ProjectCardSkeleton, 
    LatestActivitiesSkeleton 
};

export * from './text'
export * from './tags/user-tags'
export * from './accordion'
export * from "./tasks/form/description"
export * from "./tasks/form/due-date"
export * from "./tasks/form/header"
export * from "./tasks/form/stage"
export * from "./tasks/form/title"
export * from "./tasks/form/users"