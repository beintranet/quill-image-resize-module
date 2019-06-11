var quill = new Quill('#editor', {
    	theme: 'snow',
     	modules: {
        imageResize: {
		  displaySize: true,
		  changeImage: (e) => console.log('change image', e),
		  changeLink: (f) => {
			  let index = f.offset(this.quill.scroll);
			  this.quill.setSelection(index, 1, 'silent');
			  var tooltip = this.quill.theme.tooltip;
			  tooltip.edit('link');
		  },
        },
       toolbar: {
				container: [
					[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
					['bold', 'italic', 'underline', 'strike'],
					[{ 'color': [] }, { 'background': [] }], 
					[{ 'align': [] }],
					['link', 'image'],
				],  // Selector for toolbar container
				handlers: {
					// handlers object will be merged with default handlers object
					// 'link': function(value) {
					// 	// if (value) {
					// 	// 	var href = prompt('Enter the URL');
					// 	// 	this.quill.format('link', href);
					// 	// } else {
					// 	// 	this.quill.format('link', false);
					// 	// }
					// 	console.log('errr')
					// },
				// 	'image': function(value) {
				// 		if (value) {
				// 			var href = prompt('Enter the URL');
				// 			this.quill.format('link', href);
				// 		} else {
				// 			this.quill.format('link', false);
				// 		}
				// 	},
				},
			 },
			},
		})