# SkillLink

## Current State
SkillLink is a fully functional skill-sharing platform with pages for Home, Auth, Dashboard, Profile, Skills Browse, Search, Chat, and Bookings. Users can login/signup with any email/password. There is a Chatbot assistant. All data is mock/in-memory.

## Requested Changes (Diff)

### Add
- **Communities feature**: Users can create their own skill-sharing community (like a mini-website/group) with a name, description, topic/focus, and banner.
- **Communities list page** (`/communities`): Browse all communities, search by name or topic, see member count.
- **Community detail page** (`/communities/:id`): View a community's info, members, pinned skills, and a community message board/wall.
- **Create Community flow**: A form (modal or page) where a logged-in user fills in community name, description, topic/category, and optionally a tagline. The creator becomes the admin.
- **Join/Leave community**: Any logged-in user can join or leave a community.
- **"My Communities" section on Dashboard**: Shows communities the user has joined or created.
- **Nav link to Communities page**.

### Modify
- Navbar: Add "Communities" link.
- Dashboard: Add a "My Communities" card section.
- App.tsx: Add routes for `/communities` and `/communities/:id`.
- AppContext: Add communities state (list of communities, join/leave/create actions).

### Remove
- Nothing removed.

## Implementation Plan
1. Add community types and mock data (5-6 sample communities with members, topics, posts).
2. Add communities state + actions to AppContext (create, join, leave).
3. Create `CommunitiesPage.tsx` -- browse/search communities grid, "Create Community" button opens modal.
4. Create `CommunityDetailPage.tsx` -- banner, info, members grid, skill tags, simple message board (post text messages).
5. Create `CreateCommunityModal.tsx` -- form: name, tagline, description, topic/category.
6. Update Navbar to include Communities link.
7. Update Dashboard to show My Communities section.
8. Update App.tsx with new routes.
