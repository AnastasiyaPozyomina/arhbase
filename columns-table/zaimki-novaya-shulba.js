export const columns = [
    {
      accessorKey: "settlement", //access nested data with dot notation
      header: "название заимки",
      size: 150
    },
    {
      accessorKey: "name", //access nested data with dot notation
      header: "имена в отношении к домохозяину (м.р.)",
      size: 150
    },
  
    {
      accessorKey: "nationality",
      header: "нац-ть",
      size: 20
    },
    {
      accessorKey: "estate",
      header: "сослов./назв. промысла",
      size: 150
    },
    {
      accessorKey: "female-name",
      header: "имена в отношении к домохозяину (ж.р.)",
      size: 20
    },
    {
      accessorKey: "migrant",
      header: "старожил/\nпереселенец/ прочий",
      size: 150
    },
    {
      accessorKey: "year-of-arrival",
      header: "год прихода в Сибирь",
      size: 150
    },
    {
      accessorKey: "year",
      header: "год поселения",
      size: 20
    },
    {
      accessorKey: "province",
      header: "губерния\nвыхода",
      size: 150
    },
    {
      accessorKey: "farming",
      header: "личное\nхозяйство\nлошадь/крс /овцы",
      size: 150
    }
  
  ]