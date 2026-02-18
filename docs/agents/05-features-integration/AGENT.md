# Agent 5: Features Integration

**Status:** Ready to Execute  
**Dependencies:** Agent 1-4 (Setup, Backend, Frontend, Shared Package)  
**Estimated Time:** 8-11 hours (2 full days)  
**Working Directory:** `timeblocks/apps/web/`

---

## 📋 Overview

This agent builds the core features of TimeBlocks - the actual time tracking, project management, client management, and reporting functionality that makes the app useful.

### What Makes This Different

Unlike previous agents that built infrastructure, Agent 5 builds the **actual product features** that users will interact with daily:

- ⏱️ **Real-time timer** - Start tracking time with one click
- 📊 **Project tracking** - See exactly where time is spent
- 👥 **Client management** - Keep all client info organized
- 📈 **Analytics & Reports** - Understand productivity patterns

---

## 🎯 What You'll Build

### Timer Feature (Sub-Agent 5.1)

```
✅ Timer Component
   - Big, prominent timer display
   - Start/Stop button
   - Project selector
   - Description field
   
✅ Timer State (Redux)
   - Active timer tracking
   - Elapsed time calculation
   - Auto-update every second
   
✅ Persistence
   - Save to localStorage on start
   - Restore on page refresh
   - Sync with backend
   
✅ Timer Page
   - Recent entries
   - Quick project selection
   - Stats for today
```

### Projects & Clients (Sub-Agent 5.2)

```
✅ Projects List Page
   - All projects with stats
   - Filter by client/status
   - Search by name
   - Color-coded cards
   
✅ Project Detail Page
   - Full project info
   - Time entries list
   - Statistics (hours, revenue)
   - Edit/Delete actions
   
✅ Project Forms
   - Create new project
   - Edit existing
   - Validation with Zod
   - Client selection
   
✅ Clients List Page
   - All clients
   - Search and filter
   - Projects count
   
✅ Client Detail Page
   - Client info
   - Associated projects
   - Total stats
   
✅ Client Forms
   - Create/Edit forms
   - Validation
   - Color picker
```

### Reports (Sub-Agent 5.3)

```
✅ Summary Report
   - Total hours this week/month
   - Total revenue
   - Daily averages
   - Top projects
   
✅ By Project Report
   - Pie chart of time distribution
   - Bar chart of revenue
   - Table with details
   
✅ Daily/Weekly Report
   - Line chart of hours over time
   - Compare weeks
   - Filter by date range
   
✅ Date Range Picker
   - Quick ranges (Today, This Week, Last Month)
   - Custom date selection
   - Apply filters
```

---

## 🏗️ Sub-Agents Breakdown

### **Sub-Agent 5.1: Timer Feature** (3-4 hours)
**File:** `5.1-timer-feature.md`

**What it does:**
- Create timer Redux slice with real-time updates
- Build Timer component with controls
- Implement localStorage persistence
- Create Timer page with recent entries
- Integrate with backend API

**Output:**
- Working timer that persists across refreshes
- Clean, intuitive UI
- Real-time elapsed time display
- Automatic sync with backend

---

### **Sub-Agent 5.2: Projects & Clients** (3-4 hours)
**File:** `5.2-projects-clients.md`

**What it does:**
- Build Projects list and detail pages
- Build Clients list and detail pages
- Create reusable form components
- Implement CRUD operations
- Add search and filtering

**Output:**
- Complete project management UI
- Complete client management UI
- Professional forms with validation
- Smooth user experience

---

### **Sub-Agent 5.3: Reports** (2-3 hours)
**File:** `5.3-reports.md`

**What it does:**
- Install and configure Recharts
- Build summary dashboard
- Create project breakdown charts
- Build daily/weekly trend charts
- Add date range filtering

**Output:**
- Beautiful, interactive charts
- Insightful analytics
- Exportable reports
- Date filtering

---

## 📊 Expected Final Structure

```
apps/web/src/
├── pages/
│   ├── Timer/
│   │   ├── Timer.tsx
│   │   ├── Timer.module.scss
│   │   ├── components/
│   │   │   ├── TimerControls/
│   │   │   ├── RecentEntries/
│   │   │   └── TodayStats/
│   │   └── index.ts
│   ├── Projects/
│   │   ├── ProjectsList.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── ProjectForm.tsx
│   │   ├── Projects.module.scss
│   │   └── components/
│   │       ├── ProjectCard/
│   │       ├── ProjectFilters/
│   │       └── ProjectStats/
│   ├── Clients/
│   │   ├── ClientsList.tsx
│   │   ├── ClientDetail.tsx
│   │   ├── ClientForm.tsx
│   │   ├── Clients.module.scss
│   │   └── components/
│   │       ├── ClientCard/
│   │       └── ClientFilters/
│   ├── Reports/
│   │   ├── Reports.tsx
│   │   ├── Reports.module.scss
│   │   └── components/
│   │       ├── SummaryReport/
│   │       ├── ProjectReport/
│   │       ├── DailyReport/
│   │       └── DateRangePicker/
│   └── TimeEntries/
│       ├── TimeEntriesList.tsx
│       ├── TimeEntriesList.module.scss
│       └── components/
│           ├── EntryCard/
│           └── EntryFilters/
├── store/
│   └── slices/
│       └── timerSlice.ts (updated)
└── components/
    └── forms/
        ├── ProjectForm/
        ├── ClientForm/
        └── TimeEntryForm/
```

---

## 🚀 How to Execute

### Step 1: Read This File (AGENT.md)
Understand what each sub-agent does.

### Step 2: Execute Sub-Agents in Order

**Execute Sub-Agent 5.1 first:**
```bash
# Open Claude Code
claude

# Copy and paste content of 5.1-timer-feature.md
```

**Then execute Sub-Agent 5.2:**
```bash
# Copy and paste content of 5.2-projects-clients.md
```

**Finally execute Sub-Agent 5.3:**
```bash
# Copy and paste content of 5.3-reports.md
```

### Step 3: Test Everything

After all sub-agents complete:

```bash
# Make sure backend is running
cd apps/server
pnpm dev

# Start frontend
cd apps/web
pnpm dev

# Open http://localhost:5173
```

**Test flows:**
1. Start a timer → See it counting
2. Stop timer → Entry saved
3. Create a project → Appears in list
4. Create a client → Link to project
5. View reports → See your data visualized

---

## ✅ Success Criteria

After completing all 3 sub-agents:

### Timer Works
- [ ] Can start timer for a project
- [ ] Timer displays and updates every second
- [ ] Can stop timer
- [ ] Entry appears in recent list
- [ ] Timer persists on page refresh
- [ ] Syncs with backend

### Projects Work
- [ ] Can see all projects
- [ ] Can create new project
- [ ] Can edit project
- [ ] Can delete project (with confirmation)
- [ ] Can filter/search projects
- [ ] Project stats display correctly

### Clients Work
- [ ] Can see all clients
- [ ] Can create new client
- [ ] Can edit client
- [ ] Can delete client
- [ ] Can see client's projects
- [ ] Search/filter works

### Reports Work
- [ ] Summary shows correct totals
- [ ] Project breakdown chart displays
- [ ] Daily trend chart works
- [ ] Date filtering works
- [ ] All calculations are accurate

### Overall
- [ ] No console errors
- [ ] Responsive on mobile
- [ ] Loading states show correctly
- [ ] Error handling works
- [ ] UI is polished and professional

---

## 🔧 Prerequisites

Before starting:

### 1. Agents 1-4 Complete
- Monorepo setup (Agent 1)
- Backend running (Agent 2)
- Frontend foundation (Agent 3)
- Shared package (Agent 4)

### 2. Services Running
```bash
# Terminal 1: Backend
cd apps/server
pnpm dev

# Terminal 2: Frontend
cd apps/web
pnpm dev
```

### 3. Test Data (Optional)
Create some test data to see features in action:
- Register/Login
- Create 1-2 clients
- Create 2-3 projects
- Start and stop a timer

---

## 📚 Key Technologies

### Timer
- **Redux Toolkit** - State management
- **setInterval** - Real-time updates
- **localStorage** - Persistence
- **RTK Query** - API sync

### Forms
- **react-hook-form** - Form handling
- **Zod** - Validation (from shared package)
- **@hookform/resolvers** - Zod integration

### Charts
- **Recharts** - Data visualization
- **Responsive** - Mobile-friendly charts
- **Customizable** - Match app theme

### Date Handling
- **Native Date API** - No heavy libraries
- **Intl API** - Formatting
- **Shared utils** - formatDuration, etc.

---

## 🎨 Design Patterns

### Component Structure
```
Feature/
├── FeaturePage.tsx              # Main page component
├── FeaturePage.module.scss      # Page styles
├── components/
│   ├── SubComponent1/
│   │   ├── SubComponent1.tsx
│   │   └── SubComponent1.module.scss
│   └── SubComponent2/
│       ├── SubComponent2.tsx
│       └── SubComponent2.module.scss
└── index.ts                     # Clean exports
```

### Data Flow
```
1. User Action (button click)
   ↓
2. Dispatch Redux Action / RTK Query Mutation
   ↓
3. API Call to Backend
   ↓
4. Update Local State (optimistic updates)
   ↓
5. Re-render UI with new data
```

### State Management
```
- Global State (Redux): auth, timer, UI
- Server State (RTK Query): projects, clients, entries
- Local State (useState): form inputs, modals
- URL State (useSearchParams): filters, pagination
```

---

## 💡 Tips

### Development Workflow
```bash
# Terminal 1: Backend
cd apps/server
pnpm dev

# Terminal 2: Frontend
cd apps/web
pnpm dev

# Terminal 3: Shared (if making changes)
cd packages/shared
pnpm dev
```

### Testing Features
1. Use Redux DevTools to debug state
2. Check Network tab for API calls
3. Test mobile responsiveness
4. Try edge cases (empty states, errors)

### Common Patterns

**Loading State:**
```typescript
const { data, isLoading, error } = useGetProjectsQuery();

if (isLoading) return <Spinner />;
if (error) return <Error message="Failed to load" />;
```

**Form with Validation:**
```typescript
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(createProjectSchema),
});
```

**Modal Pattern:**
```typescript
const [isOpen, setIsOpen] = useState(false);

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <ProjectForm onSuccess={() => setIsOpen(false)} />
</Modal>
```

---

## 🐛 Troubleshooting

### Timer Not Updating
- Check Redux DevTools for state changes
- Verify setInterval is running
- Check browser console for errors

### API Calls Failing
- Ensure backend is running
- Check network tab for 404/500 errors
- Verify token in request headers

### Charts Not Displaying
- Ensure Recharts is installed
- Check data format matches expected
- Verify container has width/height

### Forms Not Submitting
- Check form validation errors
- Verify schema matches data shape
- Look for console errors

---

## ➡️ Next Steps

After Agent 5 completes:

1. ✅ Test all features thoroughly
2. ✅ Fix any bugs found
3. ✅ Test on mobile devices
4. ✅ Commit your work
5. 🚀 Ready for **Agent 6: Email Service**
6. Then **Agent 7: Mobile App**

---

## 🎯 Focus Areas

### User Experience
- Fast, responsive UI
- Clear feedback on actions
- Intuitive navigation
- Beautiful visualizations

### Data Accuracy
- Correct time calculations
- Accurate revenue totals
- Proper rounding
- Timezone handling

### Performance
- Optimistic updates
- Cached queries
- Lazy loading
- Debounced search

### Error Handling
- Graceful failures
- User-friendly messages
- Retry mechanisms
- Fallback states

---

**Let's build the core features! 🚀**