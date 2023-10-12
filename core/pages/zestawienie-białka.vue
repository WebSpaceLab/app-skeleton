<script setup>
const data = ref({
  "headers": ["Parametr/Składnik", "WPC", "Kazeina", "WPI", "WPH", "Colostrum"],
  "rows": [
    ["Białko (%)", "70-85", "80-90", "90-95", "85-90", "35-40"],
    ["Tłuszcze (%)", "4-8", "1-3", "0,5-1", "0,5-1", "4-6"],
    ["Węglowodany (%)", "4-8", "3-4", "0,5-1", "1-2", "45-50"],
   
    ["Składniki bioaktywne", "Immunoglobuliny, Laktoferyna", "Głównie kazeina", "Immunoglobuliny, Laktoferyna", "Niska zawartość", "Immunoglobuliny, Laktalbumina"],
    ["Dodatki", "Różne", "Różne", "Różne", "Różne", "Brak danych"],
    ["Cena (uśredniona)", "$10-20/kg", "$15-25/kg", "$20-30/kg", "$25-35/kg", "$40-60/kg"],
    ["g/h (szybkość wchłaniania)", "5-8 g/h", "3-4 g/h", "8-10 g/h", "10-12 g/h", "5-7 g/h"],
    ["DIAAS", "0,90-0,95", "0,88-0,92", "0,95-1,00", "Brak danych", "Brak danych"],
    ["BV", "104", "77", "159", "104", "Brak danych"],
    ["NPU", "92", "76", "92", "92", "Brak danych"],
    ["Tmax", "1-2", "3-7 h", "0,5-1,5 h", "0,5-1 h", "Brak danych"]
  ],
  "minerals": [
      {
        "Wapń": "1-2%",
        "Magnez": "0.1-0.2%",
        "Fosfor": "1-1.5%",
        "Potas": "0.5-1%"
      },
      {
        "Wapń": "2-2.5%",
        "Magnez": "0.2-0.3%",
        "Fosfor": "1.5-2%"
      },
      {
        "Wapń": "0.5-1%",
        "Potas": "0.2-0.5%"
      },
      {
        "Wapń": "0.5-1%",
        "Potas": "0.2-0.5%"
      },
      {
        "Wapń": "1-2%",
        "Magnez": "0.1-0.2%",
        "Fosfor": "1-1.5%",
        "Potas": "0.5-1%",
        "Sód": "0.5-1%"
      }
    ],
    "amino": [
      {
        "Leucyna": "10-12%",
        "Izoleucyna": "5-7%",
        "Walina": "5-7%",
        "Lizyna": "9-11%",
        "Treonina": "5-7%",
        "Metionina": "2-4%",
        "Cysteina": "2-3%",
        "Fenylalanina": "4-6%",
        "Tyrozyna": "4-6%",
        "Tryptofan": "1-2%",
        "Prolina": "5-7%",
        "Glutamin": "15-18%"
      },
      {
        "Leucyna": "9-11%",
        "Izoleucyna": "5-6%",
        "Walina": "5-6%",
        "Lizyna": "8-10%",
        "Treonina": "5-6%",
        "Metionina": "2-3%",
        "Cysteina": "2-3%",
        "Fenylalanina": "4-5%",
        "Tyrozyna": "4-5%",
        "Tryptofan": "1-1.5%",
        "Prolina": "12-14%",
        "Glutamin": "14-16%"
      },
      {
        "Leucyna": "11-13%",
        "Izoleucyna": "6-8%",
        "Walina": "6-8%",
        "Lizyna": "10-12%",
        "Treonina": "6-8%",
        "Metionina": "3-4%",
        "Cysteina": "2.5-3.5%",
        "Fenylalanina": "5-7%",
        "Tyrozyna": "5-7%",
        "Tryptofan": "1.5-2.5%",
        "Prolina": "6-8%",
        "Glutamin": "16-19%"
      },
      {
        "Leucyna": "10-12%",
        "Izoleucyna": "6-7%",
        "Walina": "6-7%",
        "Lizyna": "9-11%",
        "Treonina": "6-7%",
        "Metionina": "2.5-3.5%",
        "Cysteina": "2-3%",
        "Fenylalanina": "5-6%",
        "Tyrozyna": "5-6%",
        "Tryptofan": "1-2%",
        "Prolina": "5-7%",
        "Glutamin": "15-17%"
      },
      {
        "Leucyna": "8-10%",
        "Izoleucyna": "4-6%",
        "Walina": "4-6%",
        "Lizyna": "7-9%",
        "Treonina": "4-6%",
        "Metionina": "2-3%",
        "Cysteina": "1.5-2.5%",
        "Fenylalanina": "3-5%",
        "Tyrozyna": "3-5%",
        "Tryptofan": "1-1.5%",
        "Prolina": "10-12%",
        "Glutamin": "13-15%"
      }
    ],

}
)
</script>

<template>
    <div>
        <div class="container mx-auto">
            <x-table
                :head="data.headers"
                :selected="false"
            >
            
                <x-table-body v-for="(row, index) in data.rows" :key="index" >
                    <x-table-body-cell v-for="(item, index) in row" :key="index"  justify="center">
                        {{item}}
                    </x-table-body-cell>
                </x-table-body>


            </x-table>
        </div>
    </div>
</template>