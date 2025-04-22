import { supabase } from "../lib/supabase"
import { blogPosts, testimonials, galleryItems, upcomingEvents, yogaClasses, faqItems } from "../lib/data"

async function migrateData() {
  // Migrate blog posts
  for (const post of blogPosts) {
    const { error } = await supabase.from("blog_posts").insert([
      {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.excerpt, // Using excerpt as content for now
        image: post.image,
        date: post.date,
        author: post.author,
        tags: post.tags,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error(`Error migrating blog post ${post.id}:`, error)
    }
  }

  // Migrate testimonials
  for (const testimonial of testimonials) {
    const { error } = await supabase.from("testimonials").insert([
      {
        id: testimonial.id,
        name: testimonial.name,
        role: testimonial.role,
        quote: testimonial.quote,
        image: testimonial.image,
        rating: testimonial.rating,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error(`Error migrating testimonial ${testimonial.id}:`, error)
    }
  }

  // Migrate gallery images
  for (const image of galleryItems.images) {
    const { error } = await supabase.from("gallery_images").insert([
      {
        id: image.id,
        title: image.title,
        description: image.description,
        src: image.src,
        category: image.category,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error(`Error migrating gallery image ${image.id}:`, error)
    }
  }

  // Migrate gallery videos
  for (const video of galleryItems.videos) {
    const { error } = await supabase.from("gallery_videos").insert([
      {
        id: video.id,
        title: video.title,
        description: video.description,
        thumbnail: video.thumbnail,
        src: video.src,
        duration: video.duration,
        category: video.category,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error(`Error migrating gallery video ${video.id}:`, error)
    }
  }

  // Migrate events
  for (const event of upcomingEvents) {
    const { error } = await supabase.from("events").insert([
      {
        id: event.id,
        title: event.title,
        description: event.description,
        image: event.image,
        date: event.date,
        time: event.time,
        location: event.location,
        price: event.price,
        spots: event.spots,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error(`Error migrating event ${event.id}:`, error)
    }
  }

  // Migrate yoga classes
  for (const yogaClass of yogaClasses) {
    const { error } = await supabase.from("yoga_classes").insert([
      {
        id: yogaClass.id,
        title: yogaClass.title,
        description: yogaClass.description,
        image: yogaClass.image,
        level: yogaClass.level,
        duration: yogaClass.duration,
        price: yogaClass.price,
        schedule: yogaClass.schedule,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error(`Error migrating yoga class ${yogaClass.id}:`, error)
    }
  }

  // Migrate FAQ items
  for (const faq of faqItems) {
    const { error } = await supabase.from("faq_items").insert([
      {
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error(`Error migrating FAQ item ${faq.id}:`, error)
    }
  }

  console.log("Data migration completed!")
}

migrateData()
