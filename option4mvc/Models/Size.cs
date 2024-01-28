﻿using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace option4mvc.Models
{
    public class Size
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Name must be between 3 and 50 characters")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Description is required")]
        [StringLength(500, MinimumLength = 3, ErrorMessage = "Description must be between 3 and 500 characters")]
        public string? Description { get; set; }

        [Required(ErrorMessage = "Price is required")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be 0.01 or greater.")]
        [Precision(18, 2)]
        public decimal? SizePrice { get; set; }

        [Range(0.01, int.MaxValue, ErrorMessage = "Quantity must be 1 or greater.")]
        public int? Quantity { get; set; }

        public Size() { }
        public Size(string name, string description, decimal? sizePrice)
        {
            Name = name;
            Description = description;
            SizePrice = sizePrice;
            Quantity = 0;
        }
    }
}
