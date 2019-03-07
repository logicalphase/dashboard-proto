/*
Copyright 2018 Pressinfra SRL

This file is subject to the terms and conditions defined in file LICENSE,
which is part of this source code package.
*/

package projectns

import (
	"errors"
	"fmt"

	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/labels"
	utilerrors "k8s.io/apimachinery/pkg/util/errors"
)

// ProjectNamespace embeds corev1.Namespace and adds utility functions
type ProjectNamespace struct {
	*corev1.Namespace
}

var (
	// RequiredLabels is a list of required Project labels
	RequiredLabels = []string{"presslabs.com/organization", "presslabs.com/project", "presslabs.com/kind"}
	// RequiredAnnotations is a list of required Project annotations
	RequiredAnnotations = []string{"presslabs.com/created-by"}
)

type component struct {
	name       string // eg. web, database, cache
	app        string // eg. mysql, memcached
	objNameFmt string
	objName    string
}

var (
	// Namespace component
	Namespace = component{objNameFmt: "proj-%s"}
	// LimitRange component
	LimitRange = component{objName: "presslabs-dashboard"}
	// ResourceQuota component
	ResourceQuota = component{objName: "presslabs-dashboard"}
	// PrometheusServiceAccount component
	PrometheusServiceAccount = component{app: "prometheus", objName: "prometheus"}
	// PrometheusRoleBinding for ServiceAccount component
	PrometheusRoleBinding = component{app: "prometheus", objName: "prometheus"}
	// Prometheus component
	Prometheus = component{app: "prometheus", objName: "prometheus"}
	// GiteaDeployment component
	GiteaDeployment = component{name: "web", app: "gitea", objName: "gitea"}
	// GiteaService component
	GiteaService = component{name: "web", app: "gitea", objName: "gitea"}
	// GiteaIngress component
	GiteaIngress = component{name: "web", app: "gitea", objName: "gitea"}
	// GiteaPVC component
	GiteaPVC = component{name: "web", app: "gitea", objName: "gitea"}
	// GiteaSecret component
	GiteaSecret = component{name: "web", app: "gitea", objName: "gitea-conf"}
	// OwnerRoleBinding component
	OwnerRoleBinding = component{objName: "owner"}
	// MemberRoleBinding component
	MemberRoleBinding = component{objName: "member"}
	// WordpressServiceMonitor component
	WordpressServiceMonitor = component{app: "prometheus", objName: "wordpress"}
	// MysqlServiceMonitor component
	MysqlServiceMonitor = component{app: "prometheus", objName: "mysql"}
	// MemcachedServiceMonitor component
	MemcachedServiceMonitor = component{app: "prometheus", objName: "memcached"}
)

// NamespaceName returns the name of the project's namespace
func NamespaceName(name string) string {
	return fmt.Sprintf("proj-%s", name)
}

// UpdateDisplayName updates the display-name annotation
func (p *ProjectNamespace) UpdateDisplayName(displayName string) {
	if len(displayName) == 0 {
		p.ObjectMeta.Annotations["presslabs.com/display-name"] = p.ObjectMeta.Labels["presslabs.com/project"]
	} else {
		p.ObjectMeta.Annotations["presslabs.com/display-name"] = displayName
	}
}

// New wraps a dashboardv1alpha1.Project into a Project object
func New(p *corev1.Namespace) *ProjectNamespace {
	return &ProjectNamespace{p}
}

// Unwrap returns the wrapped dashboardv1alpha1.Project object
func (p *ProjectNamespace) Unwrap() *corev1.Namespace {
	return p.Namespace
}

// Labels returns default label set for dashboardv1alpha1.Project
func (p *ProjectNamespace) Labels() labels.Set {
	labels := labels.Set{
		"presslabs.com/project": p.GetLabels()["presslabs.com/project"],
	}

	if p.ObjectMeta.Labels != nil {
		if org, ok := p.ObjectMeta.Labels["presslabs.com/organization"]; ok {
			labels["presslabs.com/organization"] = org
		}
	}

	return labels
}

// ComponentLabels returns labels for a label set for a dashboardv1alpha1.Project component
func (p *ProjectNamespace) ComponentLabels(component component) labels.Set {
	labels := p.Labels()
	if len(component.app) > 0 {
		labels["app.kubernetes.io/name"] = component.app
	}
	if len(component.name) > 0 {
		labels["app.kubernetes.io/component"] = component.name
	}
	return labels
}

// ComponentName returns the object name for a component
func (p *ProjectNamespace) ComponentName(component component) string {
	if len(component.objNameFmt) == 0 {
		return component.objName
	}
	return fmt.Sprintf(component.objNameFmt, p.GetLabels()["presslabs.com/project"])
}

// Domain returns the project's subdomain label
func (p *ProjectNamespace) Domain() string {
	return p.Name
}

// ValidateMetadata validates the metadata of a Project
func (p *ProjectNamespace) ValidateMetadata() error {
	errorList := []error{}
	// Check for some required Project Labels and Annotations
	for _, label := range RequiredLabels {
		if value, exists := p.Namespace.Labels[label]; !exists || value == "" {
			errorList = append(errorList, fmt.Errorf("required label \"%s\" is missing", label))
		}
	}

	// This case should not be reachable in normal circumstances
	if p.Namespace.Labels["presslabs.com/kind"] != "project" {
		errorList = append(errorList, errors.New("label \"presslabs.com/kind\" should be \"project\""))
	}

	for _, annotation := range RequiredAnnotations {
		if value, exists := p.Annotations[annotation]; !exists || value == "" {
			errorList = append(errorList, fmt.Errorf("required annotation \"%s\" is missing", annotation))
		}
	}

	return utilerrors.Flatten(utilerrors.NewAggregate(errorList))
}