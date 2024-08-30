document.addEventListener('keydown', (event) => {
  let now = new Date();

  // Extract the components
  let year = String(now.getFullYear());
  let month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  let day = String(now.getDate()).padStart(2, '0');
  let hours = String(now.getHours()).padStart(2, '0');
  let minutes = String(now.getMinutes()).padStart(2, '0');
  let seconds = String(now.getSeconds()).padStart(2, '0');

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }

  // Combine into the desired format
  let formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  if (event.ctrlKey && event.key === 'y') {
    copyToClipboard(formattedDateTime)
    return;
  }
  
  if (!(event.ctrlKey && event.key === 'c')) {
    return;
  }
  
  event.preventDefault(); // Prevent the default behavior of Ctrl+C (copy)

  const element = document.querySelector('[class*="job-preview style"] div');
  const divs = element.querySelectorAll(':scope > div');
  
  // [0] Title
  const title = divs[0].querySelectorAll('div > a');
  const head = title[1];
  const genre = title[2].querySelector('div');
  
  // [1] Position
  const position = element.querySelector(':scope > a');
  const pos_link = position.href.split('?')[0];
  
  // [2] Constraint
  let constraint = divs[1].innerText.split('Apply by ');
  let formula = `${formattedDateTime}, ${constraint[0]}`;
  constraint = constraint[1].split('at');
  
  // [3] Details
  const details = divs[2].querySelector('div:nth-child(3)');
  const split_details = details.querySelectorAll(':scope > div');

  const time = split_details[0].querySelectorAll('div');
  const location = split_details[1].querySelectorAll('div');
  const type = split_details[2].querySelectorAll('div');

  // [4] Authorization
  const authorization = split_details[3].querySelectorAll('div');


  details = [];

  details.push(head.href);
  details.push(formula);
  details.push(pos_link);

  details.push(head.getAttribute('aria-label'));
  details.push(genre.innerText);
  details.push(position.innerText);

  details.push(constraint[0] + "       at " + constraint[1]);

  details.push(time[1].innerText + "        " + time[2].innerText);
  details.push(type[1].innerText);
  details.push(type[2].innerText);

  details.push(location[1].innerText);
  details.push(location[2].innerText);

  details.push(authorization[1].innerText);
  details.push(authorization[2].innerText);


  copyToClipboard(details.join('|'));
});
