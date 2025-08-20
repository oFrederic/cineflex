# 🏗️ CineFlex Grid System

## Responsive Grid System Based on DESIGN.md Bento Grid Specifications

<div align="center">

_A flexible, responsive grid system inspired by modern bento layouts and Netflix's design patterns_

**📖 GRID SYSTEM REFERENCE**
**Complete guide to using the responsive grid system throughout CineFlex**

</div>

---

## 📋 Table of Contents

1. [🎯 Overview](#-overview)
2. [🚀 Quick Start](#-quick-start)
3. [🏗️ Grid Variants](#-grid-variants)
4. [📱 Responsive Behavior](#-responsive-behavior)
5. [🎨 Grid Items](#-grid-items)
6. [🔧 Configuration Options](#-configuration-options)
7. [📐 Special Grid Patterns](#-special-grid-patterns)
8. [💡 Best Practices](#-best-practices)
9. [🎭 Examples](#-examples)

---

## 🎯 Overview

The CineFlex Grid System is a comprehensive, responsive grid solution built on CSS Grid with the following features:

- **Bento-style layouts** for organized content
- **Mobile-first responsive design**
- **Multiple grid variants** for different use cases
- **Flexible item spanning** capabilities
- **Design system integration** with 4pt grid spacing
- **Performance optimized** with CSS containment

### Key Features

- ✅ **4 Grid Variants**: Bento, Movie, Hero, Content
- ✅ **Responsive Breakpoints**: Mobile to XL Desktop
- ✅ **Flexible Spans**: Items can span 1-6 columns
- ✅ **Gap Variations**: 5 different gap sizes
- ✅ **Custom Columns**: 1-7 column configurations
- ✅ **Special Patterns**: Featured and Masonry layouts

---

## 🚀 Quick Start

### Basic Usage

```tsx
import { Grid, GridItem } from '@/components/ui';

// Simple grid
<Grid variant='content' gap='md'>
  <GridItem>Item 1</GridItem>
  <GridItem>Item 2</GridItem>
  <GridItem>Item 3</GridItem>
</Grid>;
```

### With Spans

```tsx
<Grid variant='bento' gap='lg'>
  <GridItem span={2}>Wide Content</GridItem>
  <GridItem>Regular Item</GridItem>
  <GridItem>Another Item</GridItem>
</Grid>
```

---

## 🏗️ Grid Variants

### 1. Bento Grid (`variant="bento"`)

**Best for**: Varied content, dashboards, feature showcases

```tsx
<Grid variant='bento' gap='lg'>
  <GridItem span={2}>
    <div className='bg-secondary p-6 rounded-lg'>
      <h3>Featured Content</h3>
      <p>This spans 2 columns</p>
    </div>
  </GridItem>
  <GridItem>
    <div className='bg-secondary p-6 rounded-lg'>
      <h3>Regular Item</h3>
      <p>Standard single column</p>
    </div>
  </GridItem>
</Grid>
```

**Responsive Behavior:**

- **Mobile**: 1 column
- **Tablet+**: Auto-fit with minmax(300px, 1fr)
- **Large screens**: Auto-fit with minmax(350px, 1fr)
- **XL screens**: Auto-fit with minmax(400px, 1fr)

### 2. Movie Grid (`variant="movie"`)

**Best for**: Movie/TV show cards, product catalogs

```tsx
<Grid variant='movie' gap='md'>
  {movies.map(movie => (
    <GridItem key={movie.id}>
      <MovieCard movie={movie} />
    </GridItem>
  ))}
</Grid>
```

**Responsive Behavior:**

- **Mobile**: 2 columns
- **Tablet (640px+)**: 3 columns
- **Desktop (768px+)**: 4 columns
- **Large Desktop (1024px+)**: 5 columns
- **XL Desktop (1280px+)**: 6 columns

### 3. Hero Grid (`variant="hero"`)

**Best for**: Hero sections, landing pages, feature comparisons

```tsx
<Grid variant='hero' gap='xl'>
  <GridItem>
    <div className='bg-secondary p-8 rounded-lg'>
      <h2>Hero Content</h2>
      <p>Main content area</p>
      <Button variant='primary'>Call to Action</Button>
    </div>
  </GridItem>
  <GridItem>
    <div className='bg-secondary p-8 rounded-lg'>
      <h2>Supporting Content</h2>
      <p>Complementary information</p>
    </div>
  </GridItem>
</Grid>
```

**Responsive Behavior:**

- **Mobile**: 1 column, 60vh min-height
- **Desktop+**: 2 columns, 80vh min-height

### 4. Content Grid (`variant="content"`)

**Best for**: General content, articles, blog posts

```tsx
<Grid variant='content' gap='md'>
  {articles.map(article => (
    <GridItem key={article.id}>
      <ArticleCard article={article} />
    </GridItem>
  ))}
</Grid>
```

**Responsive Behavior:**

- **Mobile**: 1 column
- **Tablet (640px+)**: 2 columns
- **Desktop (768px+)**: 3 columns
- **Large Desktop (1024px+)**: 4 columns
- **XL Desktop (1280px+)**: 5 columns

---

## 📱 Responsive Behavior

### Breakpoint System

The grid system uses a mobile-first approach with these breakpoints:

```css
/* Mobile: < 640px */
/* Tablet: 640px - 767px */
/* Desktop: 768px - 1023px */
/* Large Desktop: 1024px - 1279px */
/* XL Desktop: 1280px+ */
```

### Responsive Spans

Grid items can have different spans at different breakpoints:

```tsx
<Grid variant='bento' gap='lg'>
  <GridItem span={1} className='md:gridItem--span-2 lg:gridItem--span-3'>
    Responsive Item
  </GridItem>
</Grid>
```

**Available responsive classes:**

- `sm:gridItem--span-2` (640px+)
- `md:gridItem--span-2`, `md:gridItem--span-3` (768px+)
- `lg:gridItem--span-2`, `lg:gridItem--span-3`, `lg:gridItem--span-4` (1024px+)

---

## 🎨 Grid Items

### Basic GridItem

```tsx
<GridItem>Content</GridItem>
```

### With Span

```tsx
<GridItem span={2}>Spans 2 columns</GridItem>
<GridItem span={3}>Spans 3 columns</GridItem>
```

### With Custom Classes

```tsx
<GridItem span={2} className='bg-secondary p-6 rounded-lg'>
  Custom styled item
</GridItem>
```

---

## 🔧 Configuration Options

### Grid Props

| Prop          | Type                                        | Default     | Description            |
| ------------- | ------------------------------------------- | ----------- | ---------------------- |
| `variant`     | `'bento' \| 'movie' \| 'hero' \| 'content'` | `'content'` | Grid layout variant    |
| `columns`     | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7`           | `1`         | Number of columns      |
| `gap`         | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`      | `'md'`      | Gap between items      |
| `className`   | `string`                                    | `''`        | Additional CSS classes |
| `data-testid` | `string`                                    | `undefined` | Test identifier        |

### GridItem Props

| Prop          | Type                         | Default     | Description               |
| ------------- | ---------------------------- | ----------- | ------------------------- |
| `span`        | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `1`         | Number of columns to span |
| `className`   | `string`                     | `''`        | Additional CSS classes    |
| `data-testid` | `string`                     | `undefined` | Test identifier           |

### Gap Sizes

| Gap  | CSS Value         | Description                     |
| ---- | ----------------- | ------------------------------- |
| `xs` | `var(--space-2)`  | 8px - Minimal spacing           |
| `sm` | `var(--space-4)`  | 16px - Small spacing            |
| `md` | `var(--space-6)`  | 24px - Medium spacing (default) |
| `lg` | `var(--space-8)`  | 32px - Large spacing            |
| `xl` | `var(--space-12)` | 48px - Extra large spacing      |

---

## 📐 Special Grid Patterns

### Featured Grid

For hero + main + sidebar layouts:

```tsx
<Grid variant='featured' gap='lg'>
  <GridItem>
    <div className='bg-secondary p-8 rounded-lg'>
      <h1>Hero Section</h1>
      <p>Main hero content</p>
    </div>
  </GridItem>
  <GridItem>
    <div className='bg-secondary p-6 rounded-lg'>
      <h2>Main Content</h2>
      <p>Primary content area</p>
    </div>
  </GridItem>
  <GridItem>
    <div className='bg-secondary p-6 rounded-lg'>
      <h3>Sidebar</h3>
      <p>Supporting content</p>
    </div>
  </GridItem>
</Grid>
```

**Layout:**

- **Desktop**: Hero (full width) + Main (2/3) + Sidebar (1/3)
- **Mobile**: Stacked vertically

### Masonry Grid

For varied content heights:

```tsx
<Grid variant='masonry' gap='md'>
  {posts.map(post => (
    <GridItem key={post.id}>
      <PostCard post={post} />
    </GridItem>
  ))}
</Grid>
```

**Features:**

- Auto-adjusting row heights
- Dense packing algorithm
- Varied item sizes

---

## 💡 Best Practices

### 1. Choose the Right Variant

- **Bento**: For dashboards, feature showcases, varied content
- **Movie**: For catalogs, galleries, product grids
- **Hero**: For landing pages, feature comparisons
- **Content**: For articles, blog posts, general content

### 2. Use Appropriate Spans

```tsx
// Good: Logical content grouping
<Grid variant="bento" gap="lg">
  <GridItem span={2}>Featured Article</GridItem>
  <GridItem>Quick Stats</GridItem>
  <GridItem>Quick Stats</GridItem>
</Grid>

// Avoid: Random spanning
<GridItem span={3}>Random wide item</GridItem>
```

### 3. Consider Mobile Experience

```tsx
// Good: Mobile-first approach
<Grid variant='content' gap='md'>
  <GridItem className='md:gridItem--span-2'>
    Main content (spans 2 on desktop)
  </GridItem>
  <GridItem>Sidebar</GridItem>
</Grid>
```

### 4. Use Semantic Class Names

```tsx
// Good: Descriptive class names
<GridItem className="featured-article">
  <ArticleCard article={featured} />
</GridItem>

// Avoid: Generic names
<GridItem className="item">
  <ArticleCard article={featured} />
</GridItem>
```

### 5. Optimize for Performance

- Use CSS containment for large grids
- Avoid excessive nesting
- Consider virtual scrolling for large datasets

---

## 🎭 Examples

### Movie Catalog Page

```tsx
function MovieCatalog({ movies }) {
  return (
    <div className='container'>
      <h1>Movie Catalog</h1>

      <Grid variant='movie' gap='md'>
        {movies.map(movie => (
          <GridItem key={movie.id}>
            <MovieCard movie={movie} />
          </GridItem>
        ))}
      </Grid>
    </div>
  );
}
```

### Dashboard Layout

```tsx
function Dashboard() {
  return (
    <div className='container'>
      <Grid variant='bento' gap='lg'>
        <GridItem span={2}>
          <StatsCard title='Revenue' value='$50K' />
        </GridItem>
        <GridItem>
          <StatsCard title='Users' value='1.2K' />
        </GridItem>
        <GridItem>
          <StatsCard title='Orders' value='450' />
        </GridItem>
        <GridItem span={2}>
          <ChartCard title='Sales Trend' />
        </GridItem>
        <GridItem>
          <RecentActivityCard />
        </GridItem>
      </Grid>
    </div>
  );
}
```

### Landing Page Hero

```tsx
function LandingPage() {
  return (
    <div className='container'>
      <Grid variant='hero' gap='xl'>
        <GridItem>
          <div className='bg-secondary p-8 rounded-lg'>
            <h1>Welcome to CineFlex</h1>
            <p>Discover your next favorite movie</p>
            <Button variant='primary'>Get Started</Button>
          </div>
        </GridItem>
        <GridItem>
          <div className='bg-secondary p-8 rounded-lg'>
            <h2>Why Choose Us?</h2>
            <ul>
              <li>10K+ Movies</li>
              <li>HD Quality</li>
              <li>24/7 Support</li>
            </ul>
          </div>
        </GridItem>
      </Grid>
    </div>
  );
}
```

### Blog Layout

```tsx
function BlogPage({ posts }) {
  return (
    <div className='container'>
      <Grid variant='content' gap='lg'>
        {posts.map(post => (
          <GridItem key={post.id}>
            <ArticleCard post={post} />
          </GridItem>
        ))}
      </Grid>
    </div>
  );
}
```

---

## 🎯 Integration with Design System

The grid system is fully integrated with the CineFlex design system:

- **Uses design system spacing** (4pt grid)
- **Follows color system** (bg-secondary, surface-border, etc.)
- **Consistent with typography** (heading-1, body-large, etc.)
- **Matches component styling** (Button, Card, etc.)

### CSS Variables Used

```css
/* Spacing */
--space-2: 8px /* xs gap */ --space-4: 16px /* sm gap */ --space-6: 24px
  /* md gap */ --space-8: 32px /* lg gap */ --space-12: 48px /* xl gap */
  /* Colors */ --bg-secondary: #141414 --surface-border: #404040
  --text-primary: #ffffff --text-secondary: #b3b3b3;
```

---

## 🔧 Troubleshooting

### Common Issues

**1. Grid items not aligning properly**

```tsx
// Solution: Ensure consistent item heights or use flexbox
<GridItem>
  <div className='h-full flex flex-col'>
    <h3>Title</h3>
    <p className='flex-1'>Content</p>
  </div>
</GridItem>
```

**2. Mobile layout issues**

```tsx
// Solution: Use responsive spans
<GridItem span={1} className='md:gridItem--span-2'>
  Content
</GridItem>
```

**3. Performance with large grids**

```tsx
// Solution: Use CSS containment and virtual scrolling
<Grid variant='movie' gap='md' className='contain-layout'>
  {movies.map(movie => (
    <GridItem key={movie.id}>
      <MovieCard movie={movie} />
    </GridItem>
  ))}
</Grid>
```

---

## 📚 Additional Resources

- [DESIGN.md](./DESIGN.md) - Complete design system reference
- [COMPONENTS.md](./COMPONENTS.md) - Component documentation
- [CSS Grid Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) - MDN reference
- [Bento Grid Inspiration](https://www.bentogrid.com/) - Bento grid examples

---

<div align="center">

**🎉 Ready to build amazing layouts with the CineFlex Grid System!**

</div>
