export default {
  
  "regions": [
    {
      "id": "10",
      "name": "WA/AK FULL LINE"
    },
    {
      "id": "50",
      "name": "OR FULL LINE"
    },
    {
      "id": "52",
      "name": "SW FULL LINE"
    },
    {
      "id": "90",
      "name": "NCAL FULL LINE"
    },
    {
      "id": "130",
      "name": "SCAL SO FULL LINE"
    },
    {
      "id": "140",
      "name": "SCAL NO FULL LINE"
    },
    {
      "id": "250",
      "name": "MW FULL LINE"
    },
    {
      "id": "540",
      "name": "MANHATTAN"
    },
    {
      "id": "500",
      "name": "NE FULL LINE"
    },
    {
      "id": "600",
      "name": "TX FULL LINE"
    },
    {
      "id": "650",
      "name": "SE FULL LINE"
    },
    {
      "id": "680",
      "name": "PR FULL LINE"
    },
    {
      "id": "40",
      "name": "NW/NCAL/HI RKS"
    },
    {
      "id": "135",
      "name": "SW RACKS"
    },
    {
      "id": "270",
      "name": "MW RACKS"
    },
    {
      "id": "998",
      "name": "RACK WHSE"
    },
    {
      "id": "274",
      "name": "NE RACKS"
    },
    {
      "id": "285",
      "name": "CT RACKS"
    },
    {
      "id": "290",
      "name": "SO RACKS"
    },
    {
      "id": "6000",
      "name": "DIRECT"
    }
  ],
  "reports": [
    {
      "name": "Sales and Inventory by Dept-Locations",
      "urlFragment": "/reporting/SalesAndInventoryByDeptLocations",
      "parameters": [
        "departmentNumber",
        "weeks"
      ]
    },
    {
      "name": "Sales and Inventory by Dept-VPN",
      "urlFragment": "/reporting/SalesAndInventoryByDeptVpnAll",
      "parameters": [
        "departmentNumber",
        "weeks"
      ]
    },
    {
      "name": "Sales and Inventory by Dept-VPN (By Bus Unit-Group-Region)",
      "urlFragment": "/reporting/SalesAndInventoryByDeptVpnBusinessUnitGroupRegion",
      "parameters": [
        "departmentNumber",
        "weeks"
      ]
    },
    {
      "name": "Sales and Inventory by Dept-VPN (By Region-Location)",
      "urlFragment": "/reporting/SalesAndInventoryByDeptVpnRegionLocation",
      "parameters": [
        "departmentNumber",
        "weeks",
        "regions"
      ]
    },

    {
      "name": "Supplier Color Size Detail",
      "urlFragment": "/reporting/SalesAndInventoryByDeptVpnColorSize",
      "parameters": [
        "departmentNumber",
        "weeks",
        "vpn"
      ]
    },
    {
      "name": "TY-LY by Dept-Locations",
      "urlFragment": "/reporting/SalesAndInventoryTyLyByDeptLocations",
      "parameters": [
        "departmentNumber",
        "weeks"
      ]
    }
    /*
    ,
    {
      "name": "NQC Supplier Results - Top Defective VPN's",
      "urlFragment": "/reporting/NQCSalesAndInventoryByDeptRegions",
      "parameters": [
        "departmentNumber",
        "weeks",
        "regions"
      ]
    }
    */
  ]
}