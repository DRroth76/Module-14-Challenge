const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function chartsFunction(sample_info) {
  d3.json(url).then((data) => {
    const numberofSamples = data.samples;
    const names = data.names;
    const selectedSample = numberofSamples.filter(sample => sample.id == sample_info);
    const firstSample = selectedSample[0];
    const otuIDs = firstSample.otu_ids.slice(0, 10);
    const otuLabels = firstSample.otu_labels.slice(0, 10);
    const sampleValues = firstSample.sample_values.slice(0, 10);
        
    let trace = {
      x: sampleValues,
      y: otuIDs.map(id => `OTU ${id}`),
      text: otuLabels,
      type: "bar",
      orientation: 'h'
    };
    let layout = {
      yaxis: {
        autorange: "reversed"
      }
    };
    Plotly.newPlot("bar", [trace], layout);
    
    let traceBubble = {
      x: firstSample.otu_ids,
      y: firstSample.sample_values,
      text: firstSample.otu_labels,
      mode: 'markers',
      marker: {
        size: firstSample.sample_values,
        color: firstSample.otu_ids,
      }
    };
    let layoutBubble = {
      xaxis: { title: 'OTU ID' },
      yaxis: { title: 'Sample Values' },
      showlegend: false
    };
    
    Plotly.newPlot("bubble", [traceBubble], layoutBubble);
    
    let dropdownMenu = d3.select('#selDataset');
    names.forEach(function(name){
      let option = dropdownMenu.append('option');
      option.property('value', name);
      option.text(name);
    });
    
    updateCharts(names[0], data);

    dropdownMenu.on('change', function() {
      let selectedValue = dropdownMenu.property('value');
      updateCharts(selectedValue, data);
    });
  });
}
function updateCharts(selectedValue, data) {
    const numberofSamples = data.samples;
    const selectedSample = numberofSamples.find(sample => sample.id == selectedValue);

    const otuIDs = selectedSample.otu_ids.slice(0, 10);
    const otuLabels = selectedSample.otu_labels.slice(0, 10);
    const sampleValues = selectedSample.sample_values.slice(0, 10);

    console.log("OTU IDs:", otuIDs);
    console.log("OTU Labels:", otuLabels);
    console.log("Sample Values:", sampleValues);
    
    console.log("Selected Value: " + selectedValue);
    let metadataForSelectedValue = data.metadata.find(item => item.id == selectedValue)
    console.log("Metadata for Selected Value:", metadataForSelectedValue);

    const metadataObject = {
    id: metadataForSelectedValue.id,
    ethnicity: metadataForSelectedValue.ethnicity,
    gender: metadataForSelectedValue.gender,
    age: metadataForSelectedValue.age,
    location: metadataForSelectedValue.location,
    bbtype: metadataForSelectedValue.bbtype,
    wfreq: metadataForSelectedValue.wfreq
    };
    const metadataDisplayElement = document.getElementById('sample-metadata');

    
    metadataDisplayElement.innerHTML = '';
    
    
    for (const key in metadataObject) {
      if (metadataObject.hasOwnProperty(key)) {
        const paragraph = document.createElement('p');
        paragraph.textContent = `${key}: ${metadataObject[key]}`;
        metadataDisplayElement.appendChild(paragraph);
      }
    }
    

    Plotly.update("bar", {
      x: [sampleValues],
      y: [otuIDs.map(id => `OTU ${id}`)],
      text: [otuLabels],
    });

    let traceBubble = {
      x: selectedSample.otu_ids,
      y: selectedSample.sample_values,
      text: selectedSample.otu_labels,
      mode: 'markers',
      marker: {
        size: selectedSample.sample_values,
        color: selectedSample.otu_ids,
      }
    };

    let layoutBubble = {
      xaxis: { title: 'OTU ID'},
      yaxis: { title: 'Sample Values' },
      showlegend: false
    };

    Plotly.newPlot('bubble', [traceBubble], layoutBubble);
  }
      
function init(){
  d3.json(url).then((data) => {
    let sampleNames = data.names;
    let firstname = sampleNames[0];
    let selectedValue = data.metadata;

    chartsFunction(firstname);
    updateCharts(selectedValue)
});
  }
init();