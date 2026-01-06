# LeetCode Pattern Quiz

An interactive web app to test your knowledge of LeetCode problem patterns.

## Features

- 30 LeetCode questions across Easy, Medium, and Hard difficulties
- 12 pattern categories (arrays_and_hashing, two_pointers, sliding_window, stack, binary_search, linked_list, trees, graphs, backtracking, dynamic_programming, greedy, heap_priority_queue)
- Difficulty selector
- Real-time feedback and scoring
- Responsive design

## How to Deploy to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and log in
2. Click the "+" icon in the top right and select "New repository"
3. Name it `leetcode-quiz` (or any name you prefer)
4. **Important**: Make it **Public** (GitHub Pages only works with public repos on the free plan)
5. **Do NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### Step 2: Push Your Code

Copy and paste these commands in your terminal (replace `YOUR-USERNAME` with your GitHub username):

```bash
git remote add origin https://github.com/YOUR-USERNAME/leetcode-quiz.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" (top right)
3. Click "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Under "Branch", select `main` and folder `/root`
6. Click "Save"

### Step 4: Access Your Quiz

After a few minutes, your quiz will be live at:
```
https://YOUR-USERNAME.github.io/leetcode-quiz/quiz.html
```

Or you can set quiz.html as index.html to make it the default page:
```bash
mv quiz.html index.html
git add .
git commit -m "Rename to index.html for GitHub Pages"
git push
```

Then it will be accessible at:
```
https://YOUR-USERNAME.github.io/leetcode-quiz/
```

## Local Development

Open `quiz.html` in your browser, or run a local server:

```bash
python3 -m http.server 3000
# Then visit http://localhost:3000/quiz.html
```

## Share with Others

Once deployed to GitHub Pages, anyone can access your quiz with the URL - no need for them to be on your network!
