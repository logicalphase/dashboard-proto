/*
Copyright 2017 The Kubernetes Authors.

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

package main

import (
	"flag"

	"github.com/golang/glog"

	"github.com/presslabs/dashboard/cmd/controller/app"
	"github.com/presslabs/dashboard/pkg/logs"
	"github.com/presslabs/dashboard/pkg/signals"
)

func main() {
	// set up signals so we handle the first shutdown signal gracefully
	logs.InitLogs()
	defer logs.FlushLogs()
	stopCh := signals.SetupSignalHandler()

	cmd := app.NewControllerManagerCommand(stopCh)
	cmd.Flags().AddGoFlagSet(flag.CommandLine)
	flag.CommandLine.Parse([]string{})

	if err := cmd.Execute(); err != nil {
		glog.Fatal(err)
	}
}
