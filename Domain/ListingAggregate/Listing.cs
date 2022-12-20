using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.CompanyAggregate;
using Domain.ListingAggregate.Enums;
using Domain.ListingAggregate.Objects;
using Domain.Enums;

namespace Domain.ListingAggregate
{
    public class Listing
    {
        public Guid Id { get; set; }
        public bool Accessibility { get; set; }
        public DateTime AddedOn { get; set; }
        public string AdministrationFees { get; set; }
        public double AnnualBusinessRates { get; set; }
        public double AreaTotal { get; set; }
        public UnitOfArea AreaUnits { get; set; }
        public AccessStatus AccessStatus { get; set; }
        public int AvailableBedrooms { get; set; }
        public DateTime AvailableFromDate { get; set; }
        public bool Basement { get; set; }
        public int Bathrooms { get; set; }
        public List<Utility> BillsIncluded { get; set; }
        public bool BurglarAlarm { get; set; }
        public bool BusinessForSale { get; set; }
        public List<Incentive> BuyerIncentives { get; set; }
        public Category Category { get; set; }
        public CentralHeating CentralHeating { get; set; }
        public bool ChainFree { get; set; }
        public List<string> CommercialUseClass { get; set; }
        public List<Utility> ConnectedUtilities { get; set; }
        public bool Conservatory { get; set; }
        public int ConstructionYear { get; set; }
        public ICollection<Content> Contents { get; set; }
        public CookerType CookerType { get; set; }
        public CouncilTaxBand CouncilTaxBand { get; set; }
        public DecorativeCondition DecorativeCondition { get; set; }
        public double Deposit { get; set; }
        public ICollection<DetailedDescription> DetailedDescriptions { get; set; }
        public bool DoubleGlazing { get; set; }
        public EpcRatings EpcRatings { get; set; }
        public bool FeatureProperty { get; set; }
        public List<string> FeatureList { get; set; }
        public bool Fireplace { get; set; }
        public bool FishingRights { get; set; }
        public List<int> FloorLevels { get; set; }
        public int Floors { get; set; }
        public FurnishedState FurnishedState { get; set; }
        public bool Freezer { get; set; }
        public bool Fridge { get; set; }
        public double GroundRent { get; set; }
        public bool Gym { get; set; }
        public string LeaseExpiry { get; set; }
        public LifeCycleStatus LifeCycleStatus { get; set; }
        public ListedBuildingGrade ListedBuildingGrade { get; set; }
        public string ListingReference { get; set; }
        public ListingLocation ListingLocation { get; set; }
        public int LivingRooms { get; set; }
        public bool Loft { get; set; }
        public int MinimumContractLength { get; set; }
        public UnitOfTime MinimumContractLengthUnits { get; set; }
        public bool NewBuild { get; set; }
        public DateTime OpenDay { get; set; }
        public bool Outbuildings { get; set; }
        public List<OutsideSpace> OutsideSpaces { get; set; }
        public List<Parking> Parking { get; set; }
        public bool PetsAllowed { get; set; }
        public bool PorterSecurity { get; set; }
        public Pricing Pricing { get; set; }
        public PropertyType PropertyType { get; set; }
        public int RateableValue { get; set; }
        public RentalTerm RentalTerm { get; set; }
        public bool Repossession { get; set; }
        public bool Retirement { get; set; }
        public int SapRating { get; set; }
        public ServiceCharge ServiceCharge { get; set; }
        public bool Serviced { get; set; }
        public bool SharedAccommodation { get; set; }
        public string SummaryDescription { get; set; }
        public bool SwimmingPool { get; set; }
        public bool Tenanted { get; set; }
        public Eligibility TenantEligibilityDss { get; set; }
        public Eligibility TenantEligibilityStudents { get; set; }
        public bool TennisCourt { get; set; }
        public Tenure Tenure { get; set; }
        public int TotalBedrooms { get; set; }
        public bool UtilityRoom { get; set; }
        public bool WaterFront { get; set; }
        public bool WoodFloors { get; set; }
        public Guid CompanyId { get; set; }
        public Company Company { get; set; }
        public ICollection<ListingWatcher> Watchers { get; set; } = new List<ListingWatcher>();
    }
}