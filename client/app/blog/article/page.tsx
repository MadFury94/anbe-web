"use client";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { blogPosts } from "../../../src/data/blog";

const S = `
  *{box-sizing:border-box;}
  .container{max-width:1240px;margin:0 auto;padding:0 32px;}
  h1,h2,h3,h4{font-family:'Space Grotesk',sans-serif;font-weight:600;letter-spacing:-0.01em;}
  p,li,a,label{font-family:'Inter',sans-serif;}
  .eyebrow{font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#E8873A;display:flex;align-items:center;gap:10px;margin-bottom:18px;}
  .eyebrow::before{content:"";width:28px;height:1px;background:#E8873A;flex-shrink:0;}
  .btn{display:inline-flex;align-items:center;gap:10px;padding:15px 28px;font-size:14px;font-weight:600;letter-spacing:0.02em;border-radius:2px;transition:all .25s ease;text-decoration:none;font-family:'Inter',sans-serif;}
  .btn-primary{background:#E8873A;color:#0A1628;}
  .btn-primary:hover{background:#F0A669;transform:translateY(-1px);}
  .btn-dark{border:1px solid rgba(10,22,40,0.12);color:#0A1628;}
  .btn-dark:hover{border-color:#0A1628;background:#0A1628;color:#fff;}
  .reveal{opacity:0;transform:translateY(24px);transition:opacity .7s ease,transform .7s ease;}
  .reveal.in{opacity:1;transform:translateY(0);}
  @media (prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.01ms!important;}}

  /* ARTICLE HERO */
  .article-hero{padding:0;position:relative;overflow:hidden;min-height:480px;display:flex;align-items:flex-end;}
  .article-hero-bg{position:absolute;inset:0;}
  .article-hero-bg img{width:100%;height:100%;object-fit:cover;display:block;}
  .article-hero-bg::after{content:"";position:absolute;inset:0;background:linear-gradient(to bottom,rgba(10,22,40,0.55) 0%,rgba(10,22,40,0.88) 100%);}
  .article-hero-inner{position:relative;z-index:2;padding:140px 0 60px;width:100%;}
  .article-hero .breadcrumb{font-family:'IBM Plex Mono',monospace;font-size:12px;color:rgba(247,245,240,0.62);margin-bottom:20px;letter-spacing:0.04em;}
  .article-hero .breadcrumb a{color:#E8873A;text-decoration:none;}
  .article-meta{display:flex;align-items:center;gap:14px;margin-bottom:20px;flex-wrap:wrap;}
  .article-category{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#fff;background:#E8873A;padding:4px 10px;}
  .article-date{font-family:'IBM Plex Mono',monospace;font-size:12px;color:rgba(247,245,240,0.65);letter-spacing:0.04em;}
  .article-readtime{font-family:'IBM Plex Mono',monospace;font-size:12px;color:rgba(247,245,240,0.65);letter-spacing:0.04em;}
  .article-hero h1{font-size:clamp(28px,4vw,52px);color:#fff;line-height:1.1;max-width:800px;font-family:'Space Grotesk',sans-serif;}

  /* ARTICLE BODY */
  .article-body{padding:80px 0 100px;background:#F7F5F0;}
  .article-content{max-width:720px;margin:0 auto;}
  .article-content p{font-size:18px;line-height:1.8;color:#1B222B;margin-bottom:28px;font-family:'Inter',sans-serif;}

  /* 404 */
  .not-found{padding:200px 0 120px;text-align:center;background:#F7F5F0;}
  .not-found h1{font-size:clamp(28px,4vw,46px);color:#0A1628;margin-bottom:18px;}
  .not-found p{font-size:17px;color:#4A5568;margin-bottom:36px;}

  /* RELATED */
  .related-section{padding:80px 0 110px;background:#fff;}
  .related-section h2{font-size:clamp(22px,2.6vw,32px);color:#0A1628;margin-bottom:44px;font-family:'Space Grotesk',sans-serif;}
  .related-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:28px;}
  .blog-card{border:1px solid rgba(10,22,40,0.12);background:#fff;overflow:hidden;transition:box-shadow .3s ease,transform .3s ease;display:flex;flex-direction:column;text-decoration:none;}
  .blog-card:hover{box-shadow:0 24px 48px -20px rgba(10,22,40,0.22);transform:translateY(-4px);}
  .blog-card-img{aspect-ratio:16/10;overflow:hidden;position:relative;background:#16283F;}
  .blog-card-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ease;}
  .blog-card:hover .blog-card-img img{transform:scale(1.05);}
  .blog-card-body{padding:26px 26px 28px;display:flex;flex-direction:column;flex:1;}
  .blog-meta{display:flex;align-items:center;gap:12px;margin-bottom:12px;}
  .blog-category{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#fff;background:#E8873A;padding:3px 9px;}
  .blog-date{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#8B95A1;letter-spacing:0.04em;}
  .blog-card-body h3{font-size:18px;color:#0A1628;margin-bottom:10px;font-family:'Space Grotesk',sans-serif;line-height:1.25;}
  .blog-card-body p{font-size:14px;color:#4A5568;line-height:1.65;flex:1;margin-bottom:18px;font-family:'Inter',sans-serif;}
  .blog-card-link{font-size:13px;font-weight:600;color:#0A1628;font-family:'Inter',sans-serif;display:inline-flex;align-items:center;gap:6px;transition:gap .2s ease;}
  .blog-card:hover .blog-card-link{gap:10px;}

  /* CTA BAND */
  .cta-band{background:linear-gradient(120deg,#0A1628,#16283F);padding:80px 0;position:relative;overflow:hidden;}
  .cta-band::before{content:"";position:absolute;right:-8%;top:-30%;width:340px;height:340px;background:radial-gradient(circle,rgba(232,135,58,0.25),transparent 70%);}
  .cta-inner{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:24px;}
  .cta-inner h2{color:#fff;font-size:clamp(24px,3vw,34px);max-width:520px;font-family:'Space Grotesk',sans-serif;}
  .cta-inner p{color:rgba(247,245,240,0.65);margin-top:10px;max-width:480px;font-family:'Inter',sans-serif;}

  @media (max-width:1080px){
    .related-grid{grid-template-columns:1fr;}
  }
  @media (max-width:760px){
    .article-content p{font-size:16px;}
    .container{padding:0 20px;}
    .article-body{padding:60px 0 80px;}
    .related-section{padding:60px 0 80px;}
  }
`;

function useReveal() {
    useEffect(() => {
        const els = document.querySelectorAll(".reveal");
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
            { threshold: 0.12 }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);
}



export default function BlogArticlePage() {
    const { slug } = useParams<{ slug: string }>();
    useReveal();

    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return (
            <>
                <style>{S}</style>
                <SiteNav activePath="/blog" />
                <main>
                    <section className="not-found">
                        <div className="container">
                            <h1>Article Not Found</h1>
                            <p>We couldn't find the article you're looking for. It may have been moved or the URL may be incorrect.</p>
                            <a href="/blog" className="btn btn-primary">Back to Blog →</a>
                        </div>
                    </section>
                </main>
                <SiteFooter />
            </>
        );
    }

    const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

    return (
        <>
            <style>{S}</style>
            <SiteNav activePath="/blog" />
            <main>
                {/* Hero */}
                <section className="article-hero">
                    <div className="article-hero-bg">
                        <img src={post.image} alt={post.title} />
                    </div>
                    <div className="article-hero-inner">
                        <div className="container">
                            <div className="breadcrumb">
                                <a href="/">Home</a> / <a href="/blog" className="active">Blog</a> / {post.category}
                            </div>
                            <div className="article-meta">
                                <span className="article-category">{post.category}</span>
                                <span className="article-date">{post.date}</span>
                                <span className="article-readtime">· {post.readTime}</span>
                            </div>
                            <h1>{post.title}</h1>
                        </div>
                    </div>
                </section>

                {/* Body */}
                <section className="article-body">
                    <div className="container">
                        <div className="article-content reveal">
                            {post.content.map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Related Articles */}
                {related.length > 0 && (
                    <section className="related-section">
                        <div className="container">
                            <h2 className="reveal">Related Articles</h2>
                            <div className="related-grid reveal">
                                {related.map((r) => (
                                    <a key={r.slug} href={`/blog/${r.slug}`} className="blog-card">
                                        <div className="blog-card-img">
                                            <img src={r.image} alt={r.title} />
                                        </div>
                                        <div className="blog-card-body">
                                            <div className="blog-meta">
                                                <span className="blog-category">{r.category}</span>
                                                <span className="blog-date">{r.date} · {r.readTime}</span>
                                            </div>
                                            <h3>{r.title}</h3>
                                            <p>{r.excerpt}</p>
                                            <span className="blog-card-link">Read More →</span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA */}
                <section className="cta-band">
                    <div className="container cta-inner">
                        <div>
                            <h2>Have a scope that needs an indigenous EPC partner?</h2>
                            <p>Send us the details and a member of our engineering team will respond within one business day.</p>
                        </div>
                        <a href="/contact" className="btn btn-primary">Start a Conversation →</a>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </>
    );
}
