var quill = new Quill('#editor', {
    	theme: 'snow',
     	modules: {
        imageResize: {
		  displaySize: true,
		  changeImage: () => console.log('change image'),
        },
       toolbar: {
				container: [
					[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
					['bold', 'italic', 'underline', 'strike'],
					[{ 'color': [] }, { 'background': [] }], 
					[{ 'align': [] }],
					['link', 'image'],
				],  // Selector for toolbar container
				// handlers: {
				// 	// handlers object will be merged with default handlers object
				// 	'link': function(value) {
				// 		if (value) {
				// 			var href = prompt('Enter the URL');
				// 			this.quill.format('link', href);
				// 		} else {
				// 			this.quill.format('link', false);
				// 		}
				// 	},
				// 	'image': function(value) {
				// 		if (value) {
				// 			var href = prompt('Enter the URL');
				// 			this.quill.format('link', href);
				// 		} else {
				// 			this.quill.format('link', false);
				// 		}
				// 	},
				// },
			 },
			},
		})