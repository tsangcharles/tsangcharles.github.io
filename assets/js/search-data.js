// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "A growing collection of my personal projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "Materials for courses I have taught",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "post-different-types-of-data-scientist",
        
          title: "Different types of Data Scientist",
        
        description: "Sharing my thoughts on different thoughts of types of Data Scientists",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/Types-of-Data-Scientists/";
          
        },
      },{id: "post-should-you-use-reinforcement-learning",
        
          title: "Should You Use Reinforcement Learning?",
        
        description: "Sharing my experience on reinforcement learning",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/reinforcement-learning/";
          
        },
      },{id: "post-sharing-my-thoughts-on-data-science-consulting",
        
          title: "Sharing my Thoughts on (Data Science) Consulting",
        
        description: "Miscellaneous thoughts about my job for the past few years",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/Thoughts-about-Consulting/";
          
        },
      },{id: "post-how-does-gradient-descent-work",
        
          title: "How does Gradient Descent work?",
        
        description: "Math Behind Gradient Descent",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/Gradient-Descent/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-liar-39-s-dice",
          title: 'Liar&amp;#39;s Dice',
          description: "A Quick Demo for Analyzing Liar&#39;s Dice Game",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2019-04-27-Liars-Dice/";
            },},{id: "projects-r",
          title: 'R²',
          description: "Why you should not use R² for machine learning",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2020-07-12-R-Squared/";
            },},{id: "projects-youtube-summarizer",
          title: 'YouTube Summarizer',
          description: "Building a Chrome Extension to Summarize YouTube Videos",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2025-10-21-Youtbe-Summarizer/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%63%6B%32%74%73%61%6E%67@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/tsangcharles", "_blank");
        },
      },{
        id: 'social-instagram',
        title: 'Instagram',
        section: 'Socials',
        handler: () => {
          window.open("https://instagram.com/tsangcharles", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
