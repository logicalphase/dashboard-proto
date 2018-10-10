/*
Copyright 2018 Pressinfra SRL.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package sync

import (
	"k8s.io/apimachinery/pkg/labels"

	wordpressv1alpha1 "github.com/presslabs/wordpress-operator/pkg/apis/wordpress/v1alpha1"
)

// getSiteLabels returns the default labels for site
func getSiteLabels(wp *wordpressv1alpha1.Wordpress, component string) labels.Set {
	l := wp.LabelsForComponent(component)
	l["app.kubernetes.io/deploy-manager"] = "sites-controller.dashboard.presslabs.com"
	return l
}