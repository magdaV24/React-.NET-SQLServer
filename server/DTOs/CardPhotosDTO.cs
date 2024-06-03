﻿using System.ComponentModel.DataAnnotations;

namespace server.DTOs
{
    public class CardPhotosDTO
    {
        [MaxLength(50)]
        public string?  AnswerPhoto { get; set; }
        [MaxLength(50)]
        public string? WrongAnswerOnePhoto { get; set; }
        [MaxLength(50)]
        public string? WrongAnswerTwoPhoto { get; set; }
        [MaxLength(50)]
        public string? WrongAnswerThreePhoto { get; set; }
        public required int HasPhotos { get; set; }
    }
}
