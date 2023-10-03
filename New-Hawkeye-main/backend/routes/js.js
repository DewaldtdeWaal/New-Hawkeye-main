const siteFunctions = {
  "Coega Kop Reservoir Pressure": () => trendData(CGK_PRESSURE_array,"pressure","NMBM_CGK_R_Trend",query),
  "Coega Kop Reservoir Level": () => trendData(CGK_LEVEL_array,"level","NMBM_CGK_R_Trend",query),
  "Coega Kop to Motherwell Flow Rate": () => trendData(CGK_MOTHERWELL_FLOW_RATE_array,"motherwellflowrate","NMBM_CGK_R_Trend",query),
  "Coega Kop from Grassridge Flow Rate": () => trendData(CGK_GRASSRIDGE_FLOW_RATE_array,"grassridgeflowrate","NMBM_CGK_R_Trend",query),
  "Coega Kop to Coega IDZ Flow Rate": () => trendData(CGK_COEGA_FLOW_RATE_array,"coegakopflowrate","NMBM_CGK_R_Trend",query),
  "Coega Kop to Coega IDZ Total Flow": () => TOTALFLOWTRENDDATA(CGK_COEGA_TOTAL_FLOW_array,"coegatotalflow","NMBM_CGK_R_TotalFlow",query),
};

for (let i = 0; i < sitesChosen.length; i++) {
  const site = sitesChosen[i];
  if (siteFunctions.hasOwnProperty(site)) {
    siteFunctions[site]();
    count++;
  }
}
