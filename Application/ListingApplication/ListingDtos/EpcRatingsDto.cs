namespace Application.ListingApplication.ListingDtos
{
    public class EpcRatingsDto
    {
        public int Id { get; set; }
        public int EerCurrentRating { get; set; }
        public int EerPotentialRating { get; set; }
        public int EirCurrentRating { get; set; }
        public int EirPotentialRating { get; set; }
    }
}