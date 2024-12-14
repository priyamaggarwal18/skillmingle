import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
// import { Separator } from "@/components/ui/separator"
import {
    CalendarDays,
    CheckCircle2,
    Clock,
    ListTodo,
    Users,
} from 'lucide-react';
import { getGithubUser } from '@/api/github';
import { getCurrUser } from '@/api';

export default function DashboardHome() {
    const [user, setUser] = useState(null);
    const [githubDetails, setGithubDetails] = useState(null);
    useEffect(() => {
        document.title = 'Dashboard | Home';
        async function fetchGithubUser() {
            const u = await getCurrUser();
            const git = await getGithubUser(u.username);
            setUser(u);
            setGithubDetails(git);
        }
        fetchGithubUser();
    }, []);
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold pb-6">
                Welcome back, {user?.fullName || "Lovish Bansal"}
            </h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-2xl text-violet-500 font-medium">
                            Total Projects
                        </CardTitle>
                        <ListTodo className="h-4 w-4 text-muted-foreground text-violet-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{githubDetails?.repositories?.length || "34"}</div>
                        <p className="text-sm text-muted-foreground pt-4">
                            2 projects added this month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-2xl font-medium text-violet-500">
                            Active Tasks
                        </CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground text-violet-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">11</div>
                        <p className="text-sm text-muted-foreground pt-4">
                            8 tasks due today
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-2xl font-medium text-violet-500">
                            Team Members
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground text-violet-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">5</div>
                        <p className="text-sm text-muted-foreground pt-4">
                            1 new members this week
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-2xl font-medium text-violet-500">
                            Completed Tasks
                        </CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground text-violet-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">145</div>
                        <p className="text-sm text-muted-foreground pt-4">
                            32 completed this week
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle className="text-violet-500 text-2xl">
                            Recent Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[300px] w-full">
                            {recentActivities.map(
                                (activity, index) => (
                                    <div
                                        key={index}
                                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                                    >
                                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-violet-500" />
                                        <div className="space-y-2">
                                            <p className="text-xl text-violet-500 font-medium leading-none">
                                                {activity.title}
                                            </p>
                                            <p className="text-md text-muted-foreground">
                                                {activity.description}
                                            </p>
                                            <div className="flex items-center pt-2">
                                                <CalendarDays className="text-violet-500 mr-2 h-4 w-4 opacity-70" />{' '}
                                                <span className="text-sm text-muted-foreground">
                                                    {activity.date}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </ScrollArea>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle className="text-2xl text-violet-500">
                            Project Progress
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {projectProgress.map((project, index) => (
                                <div
                                    key={index}
                                    className="flex items-center pb-4"
                                >
                                    <div className="w-[180px] min-w-[180px]">
                                        <p className="text-xl font-medium leading-none text-violet-500">
                                            {project.name}
                                        </p>
                                        <p className="text-md text-muted-foreground pt-2">
                                            {project.description}
                                        </p>
                                    </div>
                                    <div className="ml-auto flex items-center space-x-4">
                                        <Progress
                                            value={project.progress}
                                            className="w-[120px]"
                                        />
                                        <div className="min-w-[40px] text-right text-sm text-muted-foreground">
                                            {project.progress}%
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl text-violet-500">
                        Team Members
                    </CardTitle>
                    <CardDescription className="text-lg">
                        Your team's top contributors this month
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="flex items-center pb-4"
                            >
                                <Avatar className="h-9 w-9">
                                    <AvatarImage
                                        src={member.avatar}
                                        alt={member.name}
                                    />
                                    <AvatarFallback>
                                        {member.name
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-0">
                                    <p className="text-lg font-medium leading-none text-violet-500">
                                        {member.name}
                                    </p>
                                    <p className="text-md text-muted-foreground">
                                        {member.email}
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    <Badge variant="secondary">
                                        {member.tasksCompleted} tasks
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

const recentActivities = [
    {
        title: 'Project X Kickoff',
        description:
            'Team meeting to discuss project goals and timeline',
        date: '2 hours ago',
    },
    {
        title: 'Task Completed',
        description: 'Sarah finished the homepage design',
        date: '5 hours ago',
    },
    {
        title: 'New Team Member',
        description: 'Welcome John to the development team',
        date: '1 day ago',
    },
    {
        title: 'Client Feedback',
        description: 'Positive feedback received for Project Y',
        date: '2 days ago',
    },
    {
        title: 'Milestone Achieved',
        description:
            'Backend API development completed ahead of schedule',
        date: '3 days ago',
    },
];

const projectProgress = [
    {
        name: 'Website Redesign',
        description: 'New client project',
        progress: 75,
    },
    {
        name: 'Mobile App',
        description: 'Internal tool',
        progress: 40,
    },
    {
        name: 'CRM Integration',
        description: 'Improve customer data',
        progress: 60,
    },
    {
        name: 'Data Analytics',
        description: 'Track KPIs',
        progress: 25,
    },
];

const teamMembers = [
    {
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        avatar: '/placeholder.svg?height=32&width=32',
        tasksCompleted: 23,
    },
    {
        name: 'Michael Chen',
        email: 'michael.c@example.com',
        avatar: '/placeholder.svg?height=32&width=32',
        tasksCompleted: 19,
    },
    {
        name: 'Emily Davis',
        email: 'emily.d@example.com',
        avatar: '/placeholder.svg?height=32&width=32',
        tasksCompleted: 18,
    },
    {
        name: 'Chris Wilson',
        email: 'chris.w@example.com',
        avatar: '/placeholder.svg?height=32&width=32',
        tasksCompleted: 15,
    },
];
