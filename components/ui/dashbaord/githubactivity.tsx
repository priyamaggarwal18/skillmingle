"use client";

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, GitBranch, GitCommit, GitPullRequest, Star, Edit2 } from 'lucide-react'

// Placeholder data
const commitData = [
  { name: 'Sun', commits: 3 },
  { name: 'Mon', commits: 7 },
  { name: 'Tue', commits: 5 },
  { name: 'Wed', commits: 12 },
  { name: 'Thu', commits: 8 },
  { name: 'Fri', commits: 10 },
  { name: 'Sat', commits: 4 },
]

const recentEvents = [
  { type: 'commit', message: 'Update README.md', author: 'johndoe', time: '2 hours ago' },
  { type: 'pull_request', message: 'Fix login bug', author: 'janedoe', time: '5 hours ago' },
  { type: 'issue', message: 'Add dark mode support', author: 'alexsmith', time: '1 day ago' },
  { type: 'commit', message: 'Refactor user authentication', author: 'sarahjohnson', time: '2 days ago' },
  { type: 'pull_request', message: 'Implement new feature', author: 'mikebrown', time: '3 days ago' },
]

export default function GitHubActivity() {
  const [repoUrl, setRepoUrl] = useState('')
  const [isConnected, setIsConnected] = useState(false)

  const handleConnect = () => {
    // In a real application, this would initiate the GitHub OAuth flow
    // For this example, we'll just toggle the connection state
    setIsConnected(true)
  }

  const handleEdit = () => {
    setIsConnected(false)
    setRepoUrl('')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">GitHub Activity</h1>
        {isConnected && (
          <Button variant="outline" className="flex items-center gap-2" onClick={handleEdit}>
            <Edit2 className="h-4 w-4" />
            Edit Repository
          </Button>
        )}
      </div>

      {!isConnected ? (
        <Card className='mt-16'>
          <CardHeader>
            <CardTitle className="text-3xl">Connect Your GitHub Repository</CardTitle>
            <CardDescription className='text-xl text-violet-500'>
              Enter your GitHub repository URL to start tracking changes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); handleConnect(); }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="repo-url">Repository URL</Label>
                <Input
                  id="repo-url"
                  placeholder="https://github.com/username/repo"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="bg-white dark:bg-gray-800"
                />
              </div>
              <Button type="submit" className="bg-violet-500">Connect Repository</Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium text-violet-500">Total Commits</CardTitle>
                <GitCommit className="h-4 w-4 text-violet-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,234</div>
                <p className="text-md text-muted-foreground mt-4">+21 since last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium text-violet-500">Open Pull Requests</CardTitle>
                <GitPullRequest className="h-4 w-4 text-violet-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">23</div>
                <p className="text-md text-muted-foreground mt-4">5 merged this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium text-violet-500">Active Branches</CardTitle>
                <GitBranch className="h-4 w-4 text-violet-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">7</div>
                <p className="text-md text-muted-foreground mt-4">2 new branches</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium text-violet-500">Repository Stars</CardTitle>
                <Star className="h-4 w-4 text-violet-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">456</div>
                <p className="text-md text-muted-foreground mt-4">+32 this month</p>
              </CardContent>
            </Card>
          </div>


            <Card>
              <CardHeader>
                <CardTitle className='text-xl text-violet-500'>Recent Activity</CardTitle>
                <CardDescription className='text-lg'>
                  Latest events in your repository
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                  {recentEvents.map((event, index) => (
                    <div key={index} className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                      <span className="flex h-2 w-2 translate-y-1 rounded-full" />
                      <div className="space-y-1">
                        <p className="text-md font-medium leading-none">
                          {event.type === 'commit' && <GitCommit className="inline mr-2 h-4 w-4 text-violet-500" />}
                          {event.type === 'pull_request' && <GitPullRequest className="inline mr-2 h-4 w-4 text-violet-500" />}
                          {event.type === 'issue' && <AlertCircle className="inline mr-2 h-4 w-4 text-violet-500" />}
                          {event.message}
                        </p>
                        <p className="text-md text-muted-foreground text-violet-500">by {event.author}</p>
                        <div className="flex items-center pt-2">
                          <span className="text-sm text-muted-foreground">{event.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
        </>
      )}
    </div>
  )
}

