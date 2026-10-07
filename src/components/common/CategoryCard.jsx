import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import "./CategoryCard.css";

export const CategoryCard = ({ category }) => {
  if (!category) return null;

  return (
    <div className="category-luxury-card">
      <div className="category-card-image-wrap">
        <img
          src={category.image}
          alt={category.name}
          className="category-card-img"
          loading="lazy"
        />
        <div className="category-card-overlay"></div>
      </div>

      <div className="category-card-content">
        <div className="category-card-crest">
          <Sparkles size={16} className="text-gold" />
        </div>
        <h3 className="category-card-title">{category.name}</h3>
        <p className="category-card-desc">{category.description}</p>
        <Link
          to={`/${category.slug}`}
          className="btn btn-gold btn-sm category-explore-btn"
          aria-label={`Explore ${category.name} collection`}
        >
          <span>Explore Collection</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
};
